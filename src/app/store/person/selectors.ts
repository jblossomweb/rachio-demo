import { createSelector } from 'reselect';
import { AppState } from 'core/store';

import * as DataTypes from './dataTypes';
import paths from './paths';

/*
 * getPerson
 */

const getPersonSelector = (
  state: AppState,
): DataTypes.Person => state.get('app').getIn(
  paths.person(),
  DataTypes.defaultPerson,
);

export const getPerson = createSelector([
  getPersonSelector,
], (person: DataTypes.Person) => person);

/*
 * getPersonId
 */

export const getPersonId = createSelector([
  getPersonSelector,
], (person: DataTypes.Person) => person ? person.get(
  'id',
  DataTypes.defaultId,
) : DataTypes.defaultId);

/*
 * getThinking
 */

const getThinkingSelector = (
  state: AppState,
): DataTypes.Thinking => state.get('app').getIn(
  paths.thinking(),
  DataTypes.defaultThinking,
);

export const getThinking = createSelector([
  getThinkingSelector,
], (thinking: DataTypes.Thinking) => thinking);


/*
 * getErrors
 */

const getErrorsSelector = (
  state: AppState,
): DataTypes.Errors => state.get('app').getIn(
  paths.errors(),
  DataTypes.defaultErrors,
);

export const getErrors = createSelector([
  getErrorsSelector,
], (errors: DataTypes.Errors) => errors);

/*
 * getDevices
 */

const getDevicesSelector = (
  state: AppState,
): DataTypes.Devices => state.get('app').getIn(
  paths.devices(),
  DataTypes.defaultDevices,
);

export const getDevices = createSelector([
  getDevicesSelector,
], (devices: DataTypes.Devices) => devices);

/*
 * getNumDevices
 */

export const getNumDevices = createSelector([
  getDevicesSelector,
], (devices: DataTypes.Devices) => devices ? devices.size : 0);
