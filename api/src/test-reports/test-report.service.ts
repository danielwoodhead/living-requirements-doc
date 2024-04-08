import { JUnitXmlTestReport } from './test-report.junit-xml';

export class TestCase {
  passed: boolean;
}

export interface ITestReport {
  findTestCase(requirementId: string): TestCase;
}

export class TestReportService {
  public static parse(report: string): ITestReport | null {
    if (report.startsWith('<testsuites')) {
      return new JUnitXmlTestReport(report);
    }
    return null;
  }
}
