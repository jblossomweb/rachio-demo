import React from 'react';

import { KnobsInterface, storyBuilder } from 'core/stories';
import Template from 'app/templates/LightCentered';

import Spinner, { Props } from './Spinner';


export const mockProps: Props = {
  visible: true,
};

export const renderScene = (
  knobProps: Props,
) => (
  knobs: KnobsInterface,
  props: Props = knobProps,
) => (
  <Spinner visible={knobs.boolean('visible', props.visible)} />
);

export const scenes = {
  'visible': renderScene({
    ...mockProps,
  }),
  'not visible': renderScene({
    ...mockProps,
    visible: false,
  }),
};

storyBuilder(
  scenes,
  'atoms/Spinner',
  Template,
);
