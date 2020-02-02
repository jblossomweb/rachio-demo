import React from 'react';
import Window from 'window-or-global';
import omit from 'lodash/omit';

import { KnobsInterface, storyBuilder } from 'core/stories';
import Template from 'app/templates/LightCentered';

import mockPerson from 'app/__mocks__/person.json';

import DeviceCard, { Props } from './DeviceCard';

const mockDevice = mockPerson.devices[0];

export const mockProps: Props = {
  device: omit(mockDevice, [
    'zones',
    'scheduleRules',
    'flexScheduleRules',
  ]),
  zoneIds: mockDevice.zones.map(zone => zone.id),
  putDeviceOn: id => {
    Window.console.log(`putDeviceOn(${id})`)
  },
  putDeviceOff: id => {
    Window.console.log(`putDeviceOff(${id})`)
  },
  putZoneStartMultiple: zones => {
    Window.console.log(`putZoneStartMultiple(${zones})`)
  },
};

export const renderScene = (
  knobProps: Props,
) => (
  knobs: KnobsInterface,
  props: Props = knobProps,
) => (
  <DeviceCard
    device={knobs.object('device', props.device)}
    zoneIds={knobs.object('zoneIds', props.zoneIds)}
    putDeviceOn={mockProps.putDeviceOn}
    putDeviceOff={mockProps.putDeviceOff}
    putZoneStartMultiple={mockProps.putZoneStartMultiple}
  />
);

export const scenes = {
  'sample': renderScene({
    ...mockProps,
  }),
  'device on': renderScene({
    ...mockProps,
    device: {
      ...mockProps.device,
      on: true,
    },
  }),
  'device off': renderScene({
    ...mockProps,
    device: {
      ...mockProps.device,
      on: false,
    },
  }),
  'home kit compatible': renderScene({
    ...mockProps,
    device: {
      ...mockProps.device,
      homeKitCompatible: true,
    },
  }),
};

storyBuilder(
  scenes,
  'molecules/DeviceCard',
  Template,
);
