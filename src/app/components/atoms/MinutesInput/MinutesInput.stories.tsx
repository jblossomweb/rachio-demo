import React from 'react';
import Window from 'window-or-global';

import { KnobsInterface, storyBuilder } from 'core/stories';
import Template from 'app/templates/LightCentered';

import MinutesInput, { Props } from './MinutesInput';

export const mockProps: Props = {
  value: 3,
  onChange: event => {
    Window.console.log(`onChange()`);
    Window.console.log(event);
  }
};

export const renderScene = (
  knobProps: Props,
) => (
  knobs: KnobsInterface,
  props: Props = knobProps,
) => (
  <MinutesInput
    value={knobs.number('value', props.value || 0)}
  />
);

export const scenes = {
  'sample': renderScene({
    ...mockProps,
  }),
};

storyBuilder(
  scenes,
  'atoms/MinutesInput',
  Template,
);
