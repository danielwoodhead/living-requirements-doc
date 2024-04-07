export interface IArtifactService {
  getLatestArtifactContent(
    artifactName: string,
    fileName: string,
    repo: string,
    owner: string,
  ): Promise<string>;
}
