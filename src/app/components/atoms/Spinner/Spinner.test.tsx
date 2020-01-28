import forEach from 'lodash/forEach';

import { getTestScenes, mountScenes } from 'core/test';
import { scenes } from './Spinner.stories';
import Spinner from './Spinner';

const testScenes = getTestScenes(
  mountScenes(scenes),
  Spinner,
  component => ({
    //
}));

describe('components/atoms/Spinner', () => {
  it(`always mounts the Spinner component`, () => {
    forEach(testScenes, scene => {
      expect(scene.component.length).toBe(1);
    });
  });
});
