import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import fontAwesomePlugin from "@11ty/font-awesome";
import pluginRss from "@11ty/eleventy-plugin-rss";
import tailwindcss from "@tailwindcss/postcss";
import { execSync } from "child_process";
import cssnano from "cssnano";
import fs from "fs";
import markdownitFootnote from "markdown-it-footnote";
import path from "path";
import postcss from "postcss";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(fontAwesomePlugin, {
    defaultAttributes: {
      width: "1.25em",
      height: "1.25em",
    },
  });
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "png", "jpeg"],
    widths: ["auto"],
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
      },
    },
  });
  eleventyConfig.addLiquidFilter("dateToRfc3339", pluginRss.dateToRfc3339);
  eleventyConfig.addLiquidFilter(
    "getNewestCollectionItemDate",
    pluginRss.getNewestCollectionItemDate,
  );

  eleventyConfig.addCollection("featured", (collectionApi) => {
    return collectionApi
      .getFilteredByTag("posts")
      .filter((post) => post.data.featured)
      .sort((a, b) => b.date - a.date)
      .slice(0, 3);
  });

  const processor = postcss([tailwindcss(), cssnano({ preset: "default" })]);

  eleventyConfig.on("eleventy.before", async () => {
    const tailwindInputPath = path.resolve("./src/assets/styles/index.css");
    const tailwindOutputPath = "./_site/assets/styles/index.css";

    const cssContent = fs.readFileSync(tailwindInputPath, "utf8");

    const outputDir = path.dirname(tailwindOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const result = await processor.process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  });

  eleventyConfig.on("eleventy.after", () => {
    execSync(`npx pagefind --site _site --glob "**/*.html"`, {
      encoding: "utf-8",
    });
  });

  // Tell the dev server to watch the compiled CSS and reload when it changes
  eleventyConfig.setServerOptions({
    watch: ["_site/assets/styles/**/*.css"],
  });

  let mdLibrary;
  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.set({ typographer: true });
    mdLib.use(markdownitFootnote);
    mdLibrary = mdLib;
  });

  const calloutPresets = {
    takeaways: { icon: "💡", title: "Takeaways", color: "callout-green" },
    challenges: {
      icon: "🤔",
      title: "Biggest challenges",
      color: "callout-purple",
    },
  };

  eleventyConfig.addPairedShortcode("callout", function (content, type) {
    const preset = calloutPresets[type];
    if (!preset) {
      throw new Error(`Unknown callout type: "${type}"`);
    }
    const rendered = mdLibrary.render(content.trim());
    return `<div class="callout ${preset.color} rounded-lg p-6 my-8">
      <div class="flex items-start gap-3">
        <span class="text-2xl leading-tight">${preset.icon}</span>
        <div>
          <p class="font-sans font-bold text-lg mb-4">${preset.title}</p>
          <div class="callout-body">${rendered}</div>
        </div>
      </div>
    </div>`;
  });

  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");

  return {
    dir: { input: "src", output: "_site" },
  };
}
