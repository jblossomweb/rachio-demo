import React from 'react';
import keys from 'lodash/keys';

import { KnobsInterface, storyBuilder } from 'core/stories';
import Template from 'app/templates/LightCentered';

import StatusChip, { Props } from './StatusChip';
import { STATES } from './StatusChip.constants';

const unknownState: any = 'not part of enum';

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
  'extended offline': renderScene({
    status: 'EXTENDED_OFFLINE',
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
  'unknown': renderScene({
    status: 'UNKNOWN',
  }),
  'unknown (implicit)': renderScene({
    status: unknownState,
  }),
};

storyBuilder(
  scenes,
  'atoms/StatusChip',
  Template,
);
