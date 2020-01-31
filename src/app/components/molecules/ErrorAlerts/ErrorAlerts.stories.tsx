import React from 'react';
import Window from 'window-or-global';

import { KnobsInterface, storyBuilder } from 'core/stories';
import Template from 'app/templates/LightCentered';
import mockErrorsResponse from 'app/__mocks__/errors.json';

import ErrorAlerts, { Props } from './ErrorAlerts';

const mockErrors = mockErrorsResponse.errors;

export const mockProps: Props = {
  errors: mockErrors,
  dismissError: (key: number) => {
    Window.console.log(`dismissError(${key})`)
  },
};

export const renderScene = (
  knobProps: Props,
) => (
  knobs: KnobsInterface,
  props: Props = knobProps,
) => (
  <ErrorAlerts
    errors={knobs.object('errors', props.errors)}
    dismissError={mockProps.dismissError}
  />
);

export const scenes = {
  'multiple': renderScene({
    ...mockProps,
  }),
  'single': renderScene({
    ...mockProps,
    errors: [mockErrors[0]],
  }),
  'none': renderScene({
    ...mockProps,
    errors: [],
  }),
};

storyBuilder(
  scenes,
  'molecules/ErrorAlerts',
  Template,
);
