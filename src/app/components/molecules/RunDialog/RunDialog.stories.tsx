import React from 'react';
import Window from 'window-or-global';

import { KnobsInterface, storyBuilder } from 'core/stories';
import Template from 'app/templates/LightCentered';

import RunDialog, { Props } from './RunDialog';

export const mockProps: Props = {
  open: true,
  onClose: () => {
    Window.console.log(`onClose()`);
  },
  onRun: () => {
    Window.console.log(`onRun()`);
  },
};

export const controlledProps: Props = {
  title: 'Run Something',
  open: true,
  minutes: 3,
  onChange: e => {
    Window.console.log(`onChange(${e})`);
  },
};

export const renderScene = (
  knobProps: Props,
) => (
  knobs: KnobsInterface,
  props: Props = knobProps,
) => (
  <RunDialog
    title={props.title && knobs.text('title', props.title)}
    open={knobs.boolean('open', !!props.open)}
    minutes={props.minutes && knobs.number('minutes', props.minutes)}
    onClose={props.onClose}
    onChange={props.onChange}
    onRun={props.onRun}
  />
);

export const scenes = {
  'uncontrolled': renderScene({
    ...mockProps,
  }),
  'controlled': renderScene({
    ...mockProps,
    ...controlledProps,
  }),
};

storyBuilder(
  scenes,
  'molecules/RunDialog',
  Template,
);
