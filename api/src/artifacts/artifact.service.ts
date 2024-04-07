export interface IArtifactService {
  getLatestArtifactContent(name: string, repo: string): Promise<string>;
}
