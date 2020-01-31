import forEach from 'lodash/forEach';

import { getTestScenes, mountScenes } from 'core/test';
import { scenes } from './StatusChip.stories';
import StatusChip from './StatusChip';

const testScenes = getTestScenes(
  mountScenes(scenes),
  StatusChip,
  component => ({
    //
}));

describe('components/atoms/StatusChip', () => {
  it(`always mounts the StatusChip component`, () => {
    forEach(testScenes, scene => {
      expect(scene.component.length).toBe(1);
    });
  });
});
