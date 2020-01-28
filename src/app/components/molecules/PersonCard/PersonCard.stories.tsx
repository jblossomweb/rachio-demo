import React from 'react';
import omit from 'lodash/omit';

import { KnobsInterface, storyBuilder } from 'core/stories';
import Template from 'app/templates/LightCentered';

import mockPerson from 'app/__mocks__/person.json';

import PersonCard, { Props } from './PersonCard';


export const mockProps: Props = {
  person: omit(mockPerson, ['devices']),
  numDevices: mockPerson.devices.length,
};

export const renderScene = (
  knobProps: Props,
) => (
  knobs: KnobsInterface,
  props: Props = knobProps,
) => (
  <PersonCard
    person={knobs.object('person', props.person)}
    numDevices={knobs.number('numDevices', props.numDevices)}
  />
);

export const scenes = {
  'sample': renderScene({
    ...mockProps,
  }),
};

storyBuilder(
  scenes,
  'molecules/PersonCard',
  Template,
);
