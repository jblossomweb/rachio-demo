import React from 'react';
import Window from 'window-or-global';

import { KnobsInterface, storyBuilder } from 'core/stories';
import Template from 'app/templates/LightCentered';
import mockDevice from 'app/__mocks__/device.json';

import ZonesFilter, { Props } from './ZonesFilter';

export const mockProps: Props = {
  zonesFilter: {},
  deviceIds: [mockDevice.id],
  setZonesFilter: filter => {
    Window.console.log(`setZonesFilter(${filter})`)
  },
  clearZonesFilter: () => {
    Window.console.log(`clearZonesFilter()`)
  },
  getDeviceName: id => {
    Window.console.log(`getDeviceName(${id})`)
    return mockDevice.name;
  },
};

export const renderScene = (
  knobProps: Props,
) => (
  knobs: KnobsInterface,
  props: Props = knobProps,
) => (
  <ZonesFilter
    zonesFilter={knobs.object('zonesFilter', props.zonesFilter)}
    deviceIds={mockProps.deviceIds}
    setZonesFilter={mockProps.setZonesFilter}
    clearZonesFilter={mockProps.clearZonesFilter}
    getDeviceName={props.getDeviceName}
  />
);

export const scenes = {
  'no filter': renderScene({
    ...mockProps,
  }),
  'filter by device': renderScene({
    ...mockProps,
    zonesFilter: {
      deviceId: mockDevice.id,
    }
  }),
};

storyBuilder(
  scenes,
  'molecules/ZonesFilter',
  Template,
);
