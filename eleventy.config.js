import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import fontAwesomePlugin from "@11ty/font-awesome";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import tailwindcss from "@tailwindcss/postcss";
import { execSync } from "child_process";
import cssnano from "cssnano";
import { VentoPlugin } from "eleventy-plugin-vento";
import fs from "fs";
import path from "path";
import markdownPlugin from "./config/markdown.js";
import shortcodesPlugin from "./config/shortcodes.js";
import postcss from "postcss";

export default function (eleventyConfig) {
  eleventyConfig.addFilter("capitalize", (value) => {
    if (typeof value !== "string" || value.length === 0) {
      return value;
    }

    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
  });

  eleventyConfig.addFilter("date", (value, format) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      throw new Error(`Invalid date passed to date filter: "${value}"`);
    }

    const replacements = {
      "%-d": String(date.getUTCDate()),
      "%b": date.toLocaleDateString("en-US", {
        month: "short",
        timeZone: "UTC",
      }),
      "%Y": String(date.getUTCFullYear()),
    };

    return format.replace(/%-d|%b|%Y/g, (token) => replacements[token]);
  });

  eleventyConfig.addPlugin(fontAwesomePlugin, {
    defaultAttributes: {
      width: "1.25em",
      height: "1.25em",
    },
  });
  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss",
    outputPath: "/feed.xml",
    collection: {
      name: "posts",
      limit: 0,
    },
    metadata: {
      language: "en",
      title: "Sean Peters",
      subtitle: "Software development blog by Sean Peters",
      base: "https://snptrs.dev/",
      author: {
        name: "Sean Peters",
      },
    },
  });
  eleventyConfig.addPlugin(syntaxHighlight);
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

  eleventyConfig.addPreprocessor("drafts", "*", (data, _content) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
  });

  eleventyConfig.addPlugin(markdownPlugin);
  eleventyConfig.addPlugin(shortcodesPlugin);
  eleventyConfig.addPlugin(VentoPlugin, {
    autotrim: true,
  });

  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/styles/prism-coldark-dark.css");

  return {
    dir: { input: "src", output: "_site" },
    htmlTemplateEngine: "vto",
    markdownTemplateEngine: "vto",
    dataTemplateEngine: "vto",
  };
}
