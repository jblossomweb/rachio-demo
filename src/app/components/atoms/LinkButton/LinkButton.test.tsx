import forEach from 'lodash/forEach';

import { getTestScenes, mountScenes } from 'core/test';
import { scenes } from './LinkButton.stories';
import LinkButton from './LinkButton';

const testScenes = getTestScenes(
  mountScenes(scenes),
  LinkButton,
  component => ({
    //
}));

describe('components/atoms/LinkButton', () => {
  it(`always mounts the LinkButton component`, () => {
    forEach(testScenes, scene => {
      expect(scene.component.length).toBe(1);
    });
  });
});
