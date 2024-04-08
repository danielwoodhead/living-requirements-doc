export interface IArtifactService {
  getLatestArtifactFile(
    artifactName: string,
    fileName: string,
    repo: string,
    owner: string,
  ): Promise<string>;
}
