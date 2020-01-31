import React from 'react';
import keys from 'lodash/keys';

import { KnobsInterface, storyBuilder } from 'core/stories';
import Template from 'app/templates/LightCentered';

import StatusChip, { Props } from './StatusChip';
import { STATES } from './StatusChip.constants';

export const renderScene = (
  knobProps: Props,
) => (
  knobs: KnobsInterface,
  props: Props = knobProps,
) => (
  <StatusChip
    status={knobs.select('status', keys(STATES), props.status)}
  />
);

export const scenes = {
  'offline': renderScene({
    status: 'OFFLINE',
  }),
  'standby': renderScene({
    status: 'STANDBY',
  }),
  'idle': renderScene({
    status: 'IDLE',
  }),
  'watering': renderScene({
    status: 'WATERING',
  }),
};

storyBuilder(
  scenes,
  'atoms/StatusChip',
  Template,
);
