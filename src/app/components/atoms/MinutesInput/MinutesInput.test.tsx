import forEach from 'lodash/forEach';

import { getTestScenes, mountScenes } from 'core/test';
import { scenes } from './MinutesInput.stories';
import MinutesInput from './MinutesInput';

const testScenes = getTestScenes(
  mountScenes(scenes),
  MinutesInput,
  component => ({
    //
}));

describe('components/atoms/MinutesInput', () => {
  it(`always mounts the MinutesInput component`, () => {
    forEach(testScenes, scene => {
      expect(scene.component.length).toBe(1);
    });
  });
});
