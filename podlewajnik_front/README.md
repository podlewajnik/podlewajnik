# Podlewajnik

This template should help get you started developing with Vue in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/)

## Add Vue extension

In VSCode marketplace eextensions search for 'Vue - Official' and install it

## Install Node.js

choose one of the recommended methods from https://nodejs.org/en/download/package-manager

Version:
node v20.10.0
npm 10.2.3


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install
# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
# Runs the tests with trace viewer
npx playwright test --trace on 
```
