export default function (eleventyConfig) {
  let mdLibrary;
  eleventyConfig.amendLibrary("md", (mdLib) => {
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

  eleventyConfig.addShortcode("github_repo", function (url, description) {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
      throw new Error(`Invalid GitHub URL: "${url}"`);
    }
    const owner = match[1];
    const repo = match[2];
    const desc = description
      ? `<p class="text-gray-300 text-sm mt-1">${description}</p>`
      : "";
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="github-repo block rounded-lg p-5 my-8 border border-gray-600 hover:border-accent transition-colors">
      <div class="flex items-center gap-3">
        <i class="fa-brands fa-github text-2xl text-gray-300 shrink-0"></i>
        <div>
          <span class="font-sans font-bold text-accent">${owner}/${repo}</span>
          ${desc}
        </div>
      </div>
    </a>`;
  });
}
