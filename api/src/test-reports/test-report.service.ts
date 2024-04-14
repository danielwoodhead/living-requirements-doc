import { JUnitXmlTestReport } from './test-report.junit-xml';
import { ITestReport } from './test-report.models';

export class TestReportService {
  public static parse(report: string): ITestReport | null {
    if (report.startsWith('<testsuites')) {
      return new JUnitXmlTestReport(report);
    }
    return null;
  }
}
