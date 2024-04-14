import { Inject, Injectable } from '@nestjs/common';
import { IArtifactService } from '../artifacts/artifact.service';
import { ITestReport, TestCase } from '../test-reports/test-report.models';
import { TestReportService } from '../test-reports/test-report.service';
import { IBadgeClient } from './badge.client';
import { GetBadgeRequest } from './badge.models';

@Injectable()
export class BadgeService {
  constructor(
    @Inject('IArtifactService')
    private readonly artifactService: IArtifactService,
    @Inject('IBadgeClient')
    private readonly badgeClient: IBadgeClient,
  ) {}

  async getBadge(request: GetBadgeRequest): Promise<ArrayBuffer> {
    const artifactContent = await this.artifactService.getLatestArtifactFile(
      request.artifactName,
      request.fileName,
      request.repo,
      request.owner,
    );
    if (!artifactContent) {
      throw new Error('Failed to retrieve artifact file');
    }

    const testReport: ITestReport = TestReportService.parse(artifactContent);
    if (!testReport) {
      throw new Error('Failed to parse artifact file as test report');
    }

    const testCase: TestCase = testReport.findTestCase(request.requirementId);

    let message: string;
    let color: string;
    if (!testCase) {
      message = 'Not found';
      color = 'lightgrey';
    } else if (testCase.passed) {
      message = 'Pass';
      color = 'green';
    } else {
      message = 'Fail';
      color = 'red';
    }

    return await this.badgeClient.getBadge('status', message, color);
  }
}
