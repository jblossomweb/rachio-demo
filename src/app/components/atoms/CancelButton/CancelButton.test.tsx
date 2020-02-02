import forEach from 'lodash/forEach';

import { getTestScenes, mountScenes } from 'core/test';
import { scenes } from './CancelButton.stories';
import CancelButton from './CancelButton';

const testScenes = getTestScenes(
  mountScenes(scenes),
  CancelButton,
  component => ({
    //
}));

describe('components/atoms/CancelButton', () => {
  it(`always mounts the CancelButton component`, () => {
    forEach(testScenes, scene => {
      expect(scene.component.length).toBe(1);
    });
  });
});
