export class TestCase {
  passed: boolean;
}

export interface ITestReport {
  findTestCase(requirementId: string): TestCase;
}
