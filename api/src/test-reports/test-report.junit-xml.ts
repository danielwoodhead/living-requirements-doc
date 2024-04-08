import { ITestReport, TestCase } from './test-report.models';
import xpath = require('xpath');
import dom = require('@xmldom/xmldom');

export class JUnitXmlTestReport implements ITestReport {
  private readonly document: Document;

  constructor(report: string) {
    this.document = new dom.DOMParser().parseFromString(report);
  }

  findTestCase(requirementId: string): TestCase {
    // replacing " with &quot; to protect against injection
    const testCase = xpath.select(
      `//property[@name="requirement"][@value="${requirementId.replace('"', '&quot;')}"]/ancestor::testcase`,
      this.document,
      true,
    );

    if (!this.isNode(testCase)) {
      throw new Error('testCase is not a Node');
    }

    return {
      passed: !this.isFailure(testCase),
    };
  }

  private isNode(object: any): object is Node {
    return 'childNodes' in object;
  }

  private isFailure(testCase: Node): boolean {
    if (testCase.hasChildNodes()) {
      for (let i = 0; i < testCase.childNodes.length; i++) {
        if (testCase.childNodes[i].nodeName === 'failure') {
          return true;
        }
      }
    }
    return false;
  }
}
