import React from 'react';

import { KnobsInterface, storyBuilder } from 'core/stories';
import Template from 'app/templates/LightCentered';

import LinkButton, { Props } from './LinkButton';

export const deviceProps: Props = {
  to: '/devices',
  icon: 'videogame_asset',
  text: 'Devices',
};

export const zoneProps: Props = {
  to: '/zones',
  icon: 'eco',
  text: 'Zones',
};

export const renderScene = (
  knobProps: Props,
) => (
  knobs: KnobsInterface,
  props: Props = knobProps,
) => (
  <LinkButton
    to={knobs.text('to', props.to)}
    icon={knobs.text('icon', props.icon || '')}
    text={knobs.text('text', props.text)}
  />
);

export const scenes = {
  'devices': renderScene({
    ...deviceProps,
  }),
  'zones': renderScene({
    ...zoneProps,
  }),
};

storyBuilder(
  scenes,
  'atoms/LinkButton',
  Template,
);
