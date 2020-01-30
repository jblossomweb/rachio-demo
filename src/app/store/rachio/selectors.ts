import { createSelector } from 'reselect';
import memoize from 'lodash/memoize';
import { AppState } from 'core/store';
import * as AppTypes from 'app/types';
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
 * getPolling
 */

const getPollingSelector = (
  state: AppState,
): DataTypes.Polling => state.get('app').getIn(
  paths.polling(),
  DataTypes.defaultPolling,
);

export const getPolling = createSelector([
  getPollingSelector,
], (polling: DataTypes.Polling) => polling);


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
], (devices: DataTypes.Devices) => devices?.valueSeq()
  .sortBy((device: DataTypes.Device) => device.get('createDate'))
);

/*
 * getNumDevices
 */

export const getNumDevices = createSelector([
  getDevicesSelector,
], (devices: DataTypes.Devices) => devices ? devices.size : 0);

/*
 * getDevicesLoaded
 */

export const getDevicesLoaded = createSelector([
  getDevicesSelector,
], (devices: DataTypes.Devices) => !!devices);

/*
 * getDevice
 */

export const getDevice = createSelector([
  getDevicesSelector,
], (devices: DataTypes.Devices) => memoize((
  id: string,
) => devices?.find(
  (device: DataTypes.Device) => device.get('id') === id,
)));

/*
 * getZones
 */

const getZonesSelector = (
  state: AppState,
): DataTypes.Zones => state.get('app').getIn(
  paths.zones(),
  DataTypes.defaultDevices,
);

export const getZones = createSelector([
  getZonesSelector,
], (zones: DataTypes.Zones) => zones?.toSeq());

/*
 * getDeviceZones
 */

export const getDeviceZones = createSelector([
  getZonesSelector,
], (
  zones: DataTypes.Zones,
) => memoize((
  deviceId: AppTypes.Device['id'],
) => zones
  ?.filter(
    (zone: DataTypes.Zone) => zone.get('deviceId') === deviceId,
  )
  ?.toSeq()
));

/*
 * getDeviceNumZones
 */

export const getDeviceNumZones = createSelector([
  getDeviceZones,
], (
  deviceZones,
) => memoize((
  deviceId: AppTypes.Device['id'],
) => deviceZones(deviceId)?.size || 0
));
