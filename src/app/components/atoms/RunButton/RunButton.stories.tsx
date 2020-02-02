import React from 'react';
import Window from 'window-or-global';

import { KnobsInterface, storyBuilder } from 'core/stories';
import Template from 'app/templates/LightCentered';

import RunButton, { Props } from './RunButton';

export const mockProps: Props = {
  text: 'Run',
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
  <RunButton
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
    text: 'Run Run Run'
  }),
};

storyBuilder(
  scenes,
  'atoms/RunButton',
  Template,
);
