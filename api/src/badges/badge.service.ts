import { Inject, Injectable } from '@nestjs/common';
import { IArtifactService } from '../artifacts/artifact.service';
import { ITestReport, TestCase } from '../test-reports/test-report.models';
import { TestReportService } from '../test-reports/test-report.service';
import { GetBadgeRequest, ShieldsIOBadge } from './badge.models';

@Injectable()
export class BadgeService {
  constructor(
    @Inject('IArtifactService')
    private readonly artifactService: IArtifactService,
  ) {}

  async getBadge(request: GetBadgeRequest): Promise<ShieldsIOBadge> {
    const artifactContent = await this.artifactService.getLatestArtifactFile(
      request.artifactName,
      request.fileName,
      request.repo,
      request.owner,
    );

    const testReport: ITestReport = TestReportService.parse(artifactContent);
    if (!testReport) {
      throw new Error('Failed to parse artifact file as test report');
    }

    const testCase: TestCase = testReport.findTestCase('1.1');

    let message: string;
    if (!testCase) {
      message = 'Not found';
    } else {
      message = testCase.passed ? 'Pass' : 'Fail';
    }

    return {
      schemaVersion: 1,
      label: 'status',
      message,
    };
  }
}
