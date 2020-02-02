import React from 'react';
import Window from 'window-or-global';

import { KnobsInterface, storyBuilder } from 'core/stories';
import Template from 'app/templates/LightCentered';

import CancelButton, { Props } from './CancelButton';

export const mockProps: Props = {
  text: 'Cancel',
  onClick: event => {
    Window.console.log(`onClick()`);
    Window.console.log(event);
  }
};

export const renderScene = (
  knobProps: Props,
) => (
  knobs: KnobsInterface,
  props: Props = knobProps,
) => (
  <CancelButton
    text={knobs.text('text', props.text)}
    onClick={mockProps.onClick}
  />
);

export const scenes = {
  'sample': renderScene({
    ...mockProps,
  }),
  'text': renderScene({
    ...mockProps,
    text: 'Stop'
  }),
};

storyBuilder(
  scenes,
  'atoms/CancelButton',
  Template,
);
