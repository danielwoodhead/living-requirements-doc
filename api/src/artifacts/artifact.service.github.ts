import { Injectable } from '@nestjs/common';
import JSZip = require('jszip');
import { Octokit } from 'octokit';
import { IArtifactService } from './artifact.service';

const octokit = new Octokit({
  auth: 'xxx',
});

@Injectable()
export class GitHubArtifactService implements IArtifactService {
  async getLatestArtifactContent(name: string, repo: string): Promise<string> {
    const artifacts = await octokit.rest.actions.listArtifactsForRepo({
      owner: 'danielwoodhead',
      repo,
      name,
    });
    const latestArtifact = artifacts.data.artifacts[0];
    const artifact = await octokit.rest.actions.downloadArtifact({
      owner: 'danielwoodhead',
      repo,
      artifact_id: latestArtifact.id,
      archive_format: 'zip',
    });

    if (!(artifact.data instanceof ArrayBuffer)) {
      throw new Error('artifact.data is not an ArrayBuffer');
    }
    const zipFile = await JSZip.loadAsync(artifact.data);
    const testResultsFile = zipFile.file('results.xml');
    const testResultsContent = await testResultsFile.async('string');

    return String(testResultsContent);
  }
}
