# CDT-Digital-ID-Strategy

## Install and build

```sh
npm ci
npm run build
```

Use `npm start` for the local development server.

## CSS and dependency maintenance

The build bundles all CSS and minifies it with Lightning CSS. It does not remove
unused selectors, so generated pages contain more CSS than the former PurgeCSS
build. Stylelint and its configuration have also been removed.

These toolchains were removed because they introduced vulnerable transitive
dependencies that `npm audit fix` could not resolve, including an unpatched
Braces dependency. CSS minification remains enabled; CSS linting and unused-CSS
removal are no longer part of the tooling.

Run `npm audit` to check all dependencies, including development dependencies.
Commit `package.json` and `package-lock.json` together when changing dependencies,
and verify with `npm ci`, `npm audit`, and `npm run build`. Avoid repeated
`npm audit fix --force` runs: forced major upgrades or downgrades can break tooling
without resolving all advisories. A clean audit reflects currently known
advisories, not a guarantee that dependencies have no vulnerabilities.