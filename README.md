# cdt-ods-webservices-archive

Source code for the California Governor Website Archives at
[archive.gov.ca.gov](https://archive.gov.ca.gov/). The site helps visitors find
historical California governors' websites, beginning with Jerry Brown, and
provides a link to the current governor's website.

This repository builds the archive landing site; links to historical websites
point to their separately hosted archives.

## Technology

- [Eleventy](https://www.11ty.dev/) generates the static site.
- Nunjucks provides shared layouts, includes, and template filters.
- California State Template components and local CSS provide the site's styling.
- Lightning CSS minifies CSS, and Terser minifies JavaScript.

## Local development

Install Node.js and npm, then install the locked dependencies:

```sh
npm ci
```

Start the development server:

```sh
npm start
```

Open [localhost:8080](http://localhost:8080/). Eleventy watches for changes to
templates and source assets.

## Production build

```sh
npm run build
```

Generated files are written to `_site/`. This directory is build output and
should not be edited directly or committed.

## Project structure

| Path | Purpose |
| --- | --- |
| `pages/` | Page content and front matter |
| `pages/_includes/` | Shared layout, header, and footer templates |
| `pages/_data/cssBundle.js` | Combines local CSS for use in templates |
| `src/css/` | Component styles and site-specific CSS |
| `src/js/` | Client-side JavaScript |
| `src/images/` | Images copied to `/images/` during the build |
| `src/root/` | Files copied to the site root |
| `eleventy.config.js` | Eleventy settings, asset copying, and minification filters |
| `azure-*-build-pipeline.yml` | Azure Pipelines build and artifact configuration |

## Updating the site

- Edit page content and metadata in `pages/`.
- Update shared branding and navigation in `pages/_includes/header.html`.
- Update shared footer links in `pages/_includes/footer.html`.
- Add images to `src/images/` and reference them with paths such as
  `<img src="/images/example.png" alt="Description" />`. Use template includes
  for inline SVG markup, not binary image files.
- Keep navigation, archive links, and sitemap content consistent when adding or
  removing pages. Do not delete shared includes while layouts still reference them.

CSS is bundled and minified, but unused selectors are retained. Stylelint and
PurgeCSS are not part of the current toolchain.

## Dependency maintenance

Run `npm audit` to check dependencies, including development dependencies.
When changing dependencies, commit `package.json` and `package-lock.json`
together and verify the result:

```sh
npm ci
npm audit
npm run build
```

Review proposed dependency changes rather than repeatedly running
`npm audit fix --force`, which can introduce breaking upgrades or downgrades.
A clean audit reflects currently known advisories, not a guarantee that
dependencies have no vulnerabilities.