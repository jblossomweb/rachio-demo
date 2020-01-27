import forEach from 'lodash/forEach';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { getTestScenes, mountScenes } from 'core/test';
import LightCentered from 'app/templates/LightCentered';
import { scenes } from './404.stories';
import Page404 from './404';

const testScenes = getTestScenes(
  mountScenes(scenes),
  Page404,
  component => ({
    template: component.find(LightCentered),
    p: component.find('p'),
    link: component.find(Link),
    button: component.find(Button),
}));

describe('pages/404', () => {
  it(`always mounts the Page404 component`, () => {
    forEach(testScenes, scene => {
      expect(scene.component.length).toBe(1);
    });
  });

  it(`always wraps with the LightCentered template`, () => {
    forEach(testScenes, scene => {
      expect(scene.elements.template.length).toBe(1);
    });
  });

  it(`always renders 2 <p> elements`, () => {
    forEach(testScenes, scene => {
      expect(scene.elements.p.length).toBe(2);
    });
  });

  it(`always mounts a router Link component`, () => {
    forEach(testScenes, scene => {
      expect(scene.elements.link.length).toBe(1);
    });
  });

  it(`always Links to '/' route`, () => {
    forEach(testScenes, scene => {
      const { link } = scene.elements;
      const props = link.props();
      expect(props.to).toEqual('/');
    });
  });

  it(`always mounts a material Button component`, () => {
    forEach(testScenes, scene => {
      expect(scene.elements.button.length).toBe(1);
    });
  });

  it(`always sets material Button component color prop to 'primary'`, () => {
    forEach(testScenes, scene => {
      const { button } = scene.elements;
      const props = button.props();
      expect(props.color).toBe('primary');
    });
  });

  it(`always renders expected text in material Button component`, () => {
    forEach(testScenes, scene => {
      const { button } = scene.elements;
      const text = button.text();
      const expectedText = 'Back to Home';
      expect(text).toBe(expectedText);
    });
  });
});
