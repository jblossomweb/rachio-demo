import React from 'react';
import Window from 'window-or-global';

import { KnobsInterface, storyBuilder } from 'core/stories';
import Template from 'app/templates/LightCentered';
import mockErrors from 'app/__mocks__/errors.json';

import ErrorAlert, { Props } from './ErrorAlert';

const mockError = mockErrors.errors[0];
const mockInvalidError: any = {
  ...mockError,
  message: undefined,
};

export const mockProps: Props = {
  error: mockError,
  dismissError: () => {
    Window.console.log(`dismissError()`)
  },
};

export const renderScene = (
  knobProps: Props,
) => (
  knobs: KnobsInterface,
  props: Props = knobProps,
) => (
  <ErrorAlert
    error={knobs.object('error', props.error)}
    dismissError={mockProps.dismissError}
  />
);

export const scenes = {
  'sample': renderScene({
    ...mockProps,
  }),
  'default message': renderScene({
    ...mockProps,
    error: mockInvalidError,
  }),
};

storyBuilder(
  scenes,
  'atoms/ErrorAlert',
  Template,
);
