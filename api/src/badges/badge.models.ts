import { Matches } from 'class-validator';

const VALID_REGEX = '^[A-Za-z0-9_.-]+$';

export class GetBadgeRequest {
  @Matches(VALID_REGEX)
  owner: string;

  @Matches(VALID_REGEX)
  repo: string;

  @Matches(VALID_REGEX)
  artifactName: string;

  @Matches(VALID_REGEX)
  fileName: string;

  @Matches(VALID_REGEX)
  requirementId: string;
}

export class ShieldsIOBadge {
  schemaVersion: 1;
  label: string;
  message: string;
}
