import markdownitFootnote from "markdown-it-footnote";

export default function (eleventyConfig) {
  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.set({ typographer: true });
    mdLib.use(markdownitFootnote);
  });
}
