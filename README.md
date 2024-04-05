# living-requirements-doc

These steps are done in the dev container postCreateCommand to setup Playwright:

```
sudo npx playwright install-deps
sudo apt-get update
npx playwright install
```

Run the tests:

```
npx playwright test
```

Run the tests and output JUnit XML:

```
PLAYWRIGHT_JUNIT_OUTPUT_NAME=test-results/results.xml npx playwright test --reporter=junit
```
