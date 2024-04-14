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

## Test

### 1.1 - The page has a title of 'Playwright'

![Requirement 1.1](https://living-requirements.ambitiousisland-f3762769.uksouth.azurecontainerapps.io/badge?owner=danielwoodhead&repo=living-requirements-doc&artifactName=test-results&fileName=results.xml&requirementId=1.1)

### 1.2 - The page includes a get started link

![Requirement 1.2](https://living-requirements.ambitiousisland-f3762769.uksouth.azurecontainerapps.io/badge?owner=danielwoodhead&repo=living-requirements-doc&artifactName=test-results&fileName=results.xml&requirementId=1.2)

### 1.3 - The page includes a feedback link

![Requirement 1.3](https://living-requirements.ambitiousisland-f3762769.uksouth.azurecontainerapps.io/badge?owner=danielwoodhead&repo=living-requirements-doc&artifactName=test-results&fileName=results.xml&requirementId=1.3)
