import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import JSZip = require('jszip');
import { Octokit } from 'octokit';
import { IArtifactService } from './artifact.service';

@Injectable()
export class GitHubArtifactService implements IArtifactService {
  private readonly logger = new Logger(GitHubArtifactService.name);
  private readonly octokit: Octokit;

  constructor(configService: ConfigService) {
    this.octokit = new Octokit({
      auth: configService.get<string>('GITHUB_TOKEN'),
    });
  }

  async getLatestArtifactFile(
    artifactName: string,
    fileName: string,
    repo: string,
    owner: string,
  ): Promise<string | null> {
    this.logger.log('Getting latest artifact from GitHub');
    const artifacts = await this.octokit.rest.actions.listArtifactsForRepo({
      owner,
      repo,
      artifactName,
    });
    if (artifacts?.data?.artifacts?.length ?? 0 === 0) {
      return null;
    }
    const latestArtifact = artifacts.data.artifacts[0];
    const artifact = await this.octokit.rest.actions.downloadArtifact({
      owner,
      repo,
      artifact_id: latestArtifact.id,
      archive_format: 'zip',
    });

    if (!(artifact.data instanceof ArrayBuffer)) {
      throw new Error('artifact.data is not an ArrayBuffer');
    }
    const zipFile = await JSZip.loadAsync(artifact.data);
    const file = zipFile.file(fileName);
    const fileContent = await file.async('string');

    return fileContent;
  }
}
