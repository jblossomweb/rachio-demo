import forEach from 'lodash/forEach';

import { getTestScenes, mountScenes } from 'core/test';

import MuiAlert from '@material-ui/lab/Alert';

import { scenes } from './ErrorAlert.stories';
import * as Style from './ErrorAlert.style';
import ErrorAlert from './ErrorAlert';

const testScenes = getTestScenes(
  mountScenes(scenes),
  ErrorAlert,
  component => ({
    styleWrapper: component.find(Style.Wrapper),
    muiAlert: component.find(MuiAlert),
}));

describe('components/atoms/ErrorAlert', () => {
  it(`always mounts the ErrorAlert component`, () => {
    forEach(testScenes, scene => {
      expect(scene.component.length).toBe(1);
    });
  });

  it(`always mounts the Style.Wrapper component`, () => {
    forEach(testScenes, scene => {
      expect(scene.elements.styleWrapper.length).toBe(1);
    });
  });

  it(`always mounts the MuiAlert component`, () => {
    forEach(testScenes, scene => {
      expect(scene.elements.muiAlert.length).toBe(1);
    });
  });

  it(`renders error.message within MuiAlert component`, () => {
    forEach(testScenes, scene => {
      const { error } = scene.props;
      if (error.message) {
        const { muiAlert } = scene.elements;
        const props = muiAlert.props();
        expect(props.children).toEqual(error.message);
      }
    });
  });

  it(`renders default text within MuiAlert component if error.message is falsey`, () => {
    forEach(testScenes, scene => {
      const { error } = scene.props;
      if (!error.message) {
        const { muiAlert } = scene.elements;
        const props = muiAlert.props();
        expect(props.children).toEqual('something went wrong');
      }
    });
  });
});
