import React from 'react';

import { KnobsInterface, storyBuilder } from 'core/stories';
import Template from 'app/templates/LightCentered';
import mockZone from 'app/__mocks__/zone.json';
import mockDevice from 'app/__mocks__/device.json';

import ZoneCard, { Props } from './ZoneCard';

export const mockProps: Props = {
  zone: mockZone,
  deviceOn: mockDevice.on,
  deviceStatus: mockDevice.status,
};

export const renderScene = (
  knobProps: Props,
) => (
  knobs: KnobsInterface,
  props: Props = knobProps,
) => (
  <ZoneCard
    zone={knobs.object('zone', props.zone)}
    deviceOn={knobs.boolean('deviceOn', props.deviceOn)}
    deviceStatus={
      knobs.select('deviceStatus', ['ONLINE', 'OFFLINE'], props.deviceStatus)
    }
  />
);

export const scenes = {
  'sample': renderScene({
    ...mockProps,
  }),
};

storyBuilder(
  scenes,
  'molecules/ZoneCard',
  Template,
);
