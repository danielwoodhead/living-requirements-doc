import { Injectable } from '@nestjs/common';
import { IArtifactService } from './artifact.service';

const xml = `<testsuites id="" name="" tests="6" failures="0" skipped="0" errors="0" time="8.198390999999999">
<testsuite name="example.spec.ts" timestamp="2024-04-05T09:56:29.418Z" hostname="chromium" tests="2" failures="0" skipped="0" time="0.842" errors="0">
<testcase name="has title" classname="example.spec.ts" time="0.381">
<properties>
<property name="requirement" value="1.1">
</property>
</properties>
<failure></failure>
</testcase>
</testsuite>
</testsuites>`;

@Injectable()
export class FakeJUnitXmlArtifactService implements IArtifactService {
  getLatestArtifactFile(): Promise<string> {
    return Promise.resolve(xml);
  }
}
