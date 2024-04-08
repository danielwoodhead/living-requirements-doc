export class GetBadgeRequest {
  owner: string;
  repo: string;
  artifactName: string;
  fileName: string;
}

export class ShieldsIOBadge {
  schemaVersion: 1;
  label: string;
  message: string;
}
