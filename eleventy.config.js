//@ts-check
const { minify } = require("terser");
const { transform } = require("lightningcss");

/**
 * @typedef {import("./node_modules/@11ty/eleventy/src/defaultConfig.js").defaultConfig} EleventyDefaultConfig
 * @typedef {import("@11ty/eleventy/UserConfig").default} EleventyConfig
 */

module.exports = async function (
  /** @type {EleventyConfig} **/ eleventyConfig
) {
  const domain = "https://www.archive.gov.ca.gov";

  eleventyConfig.addGlobalData("layout", "base-layout");

  eleventyConfig.addPassthroughCopy({
    "src/images": "images",
    "src/root": "/",
    "src/fonts": "fonts"
  });

  eleventyConfig.addWatchTarget("./src");

  eleventyConfig.addNunjucksAsyncFilter(
    "cssmin",
    /**
     *
     * @param {string} code
     * @param {(arg0: null, arg1: string) => void} callback
     */
    async (code, callback) => {
      try {
        const { code: minifiedCode } = transform({
          filename: "style.css",
          code: Buffer.from(code),
          minify: true,
          sourceMap: false
        });
        callback(null, minifiedCode.toString());
      } catch (err) {
        console.error("Lightning CSS error:", err);
        callback(null, code);
      }
    }
  );

  eleventyConfig.addNunjucksAsyncFilter(
    "jsmin",
    /**
     *
     * @param {string} code
     * @param {(arg0: null, arg1: string) => void} callback
     */
    async (code, callback) => {
      const minified = await minify(code);
      callback(null, minified.code || "");
    }
  );

  /**
   * Wraps content in a specified HTML tag with optional attributes.
   */
  eleventyConfig.addFilter(
    "wrapTag",
    function (
      /** @type {string} */ content,
      /** @type {string} */ tagName,
      /** @type {string} */ attributes = ""
    ) {
      const attrs = attributes.trim() ? " " + attributes.trim() : "";
      return `<${tagName}${attrs}>${content}</${tagName}>`;
    }
  );

  //Start with default config, easier to configure 11ty later
  /** @type {EleventyDefaultConfig} */
  const config = {
    // allow nunjucks templating in .html files
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "11ty.js", "md"],
    keys: {},
    dir: {
      // site content pages
      input: "pages"
    }
  };

  return config;
};
