# Living requirements doc

This project demonstrates a requirements document that automatically reflects the current status of each requirement using the latest automated test results.

## Example requirements

> This may take a few seconds to load because the demo scales down to zero to save $$$

### 1.1 - The page has a title of 'Playwright'

![Requirement 1.1](https://living-requirements.ambitiousisland-f3762769.uksouth.azurecontainerapps.io/badge?owner=danielwoodhead&repo=living-requirements-doc&artifactName=test-results&fileName=results.xml&requirementId=1.1)

### 1.2 - The page includes a get started link

![Requirement 1.2](https://living-requirements.ambitiousisland-f3762769.uksouth.azurecontainerapps.io/badge?owner=danielwoodhead&repo=living-requirements-doc&artifactName=test-results&fileName=results.xml&requirementId=1.2)

### 1.3 - The page includes a feedback link

![Requirement 1.3](https://living-requirements.ambitiousisland-f3762769.uksouth.azurecontainerapps.io/badge?owner=danielwoodhead&repo=living-requirements-doc&artifactName=test-results&fileName=results.xml&requirementId=1.3)

## How does it work?

A test for requirement 1.1 above might look like this written with Playwright:

```ts
test(
  "has title",
  {
    annotation: {
      type: "requirement",
      description: "1.1",
    },
  },
  async ({ page }) => {
    await page.goto("https://playwright.dev/");

    await expect(page).toHaveTitle(/Playwright/);
  }
);
```

It has an annotation linking it to the requirement ID.

Playwright can output test results in various formats. This demo uses JUnit XML:

```xml
<testsuites id="" name="" tests="6" failures="0" skipped="0" errors="0" time="8.198390999999999">
  <testsuite name="example.spec.ts" timestamp="2024-04-05T09:56:29.418Z" hostname="chromium" tests="2" failures="0" skipped="0" time="0.842" errors="0">
    <testcase name="has title" classname="example.spec.ts" time="0.381">
      <properties>
        <property name="requirement" value="1.1">
        </property>
      </properties>
    </testcase>
  </testsuite>
</testsuites>
```

The test annotation has been translated into a testcase property in the JUnit XML output.

The API in this repo has an endpoint that will return a badge to display whether the test associated with a requirement last passed, failed or was not found:

```
GET /badge
    ?owner=owner
    &repo=repo
    &artifactName=test-results
    &fileName=results.xml
    &requirementId=1.1
```

It does the following:

1. Retrieves the latest test result artifact from GitHub
2. Determines the current status of the relevant test
3. Uses [shields.io](https://shields.io/) to create the badge as an SVG to display in the requirements doc

This can be used in markdown like so:

```md
![Requirement {REQUIREMENT_ID}]({API_URL}/badge?owner={OWNER}&repo={REPO}&artifactName={ARTIFACT_NAME}&fileName={FILE_NAME}&requirementId={REQUIREMENT_ID})
```

## Limitations

Only JUnit XML test results created by GitHub actions are currently supported, however interfaces have been defined in the code to simplify future integrations.

For example:

```ts
class AzureDevOpsArtifactService implements IArtifactService {
  // ...
}
```

Or:

```ts
class JestHtmlTestReport implements ITestReport {
  // ...
}
```
