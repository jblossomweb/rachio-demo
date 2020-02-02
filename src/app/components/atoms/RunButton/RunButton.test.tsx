import forEach from 'lodash/forEach';

import { getTestScenes, mountScenes } from 'core/test';
import { scenes } from './RunButton.stories';
import RunButton from './RunButton';

const testScenes = getTestScenes(
  mountScenes(scenes),
  RunButton,
  component => ({
    //
}));

describe('components/atoms/RunButton', () => {
  it(`always mounts the RunButton component`, () => {
    forEach(testScenes, scene => {
      expect(scene.component.length).toBe(1);
    });
  });
});
