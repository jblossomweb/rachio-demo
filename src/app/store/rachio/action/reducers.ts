import { fromJS } from 'immutable';
import { AppState } from 'core/store';
import omit from 'lodash/omit';

import paths from '../paths';
import * as ActionTypes from './types';
import * as DataTypes from '../dataTypes';

/*
 * RACHIO_GET_SELF_ID
 */
export const getId = (
  state: AppState,
  action: ActionTypes.Interface['RACHIO_GET_SELF_ID'],
) => state
  .setIn(paths.thinking(), true)
;

/*
 * RACHIO_GET_SELF_ID_SUCCESS
 */
export const getIdSuccess = (
  state: AppState,
  { payload }: ActionTypes.Interface['RACHIO_GET_SELF_ID_SUCCESS'],
) => state
  .setIn(paths.thinking(), false)
  .setIn(paths.errors(), null)
  .setIn(paths.id(), payload.response.id)
;

/*
 * RACHIO_GET_PERSON
 */
export const getPerson = (
  state: AppState,
  action: ActionTypes.Interface['RACHIO_GET_PERSON'],
) => state
  .setIn(paths.thinking(), true)
;

/*
 * RACHIO_GET_PERSON_SUCCESS
 */
export const getPersonSuccess = (
  state: AppState,
  { payload }: ActionTypes.Interface['RACHIO_GET_PERSON_SUCCESS'],
) => state
  .setIn(paths.thinking(), false)
  .setIn(paths.errors(), null)
  .setIn(paths.person(), fromJS(omit(payload.response, [
    'devices'
  ])))
  .setIn(paths.devices(), fromJS(payload.response.devices.reduce(
    (devices, device) => ({
      ...devices,
      [device.id]: {
        ...omit(device, ['zones']),
        personId: payload.response.id,
      },
    }),
    {},
  )))
  .setIn(paths.zones(), fromJS(payload.response.devices.reduce(
    (zones, device) => ({
      ...zones,
      ...device.zones.reduce(
        (deviceZones, zone) => ({
          ...deviceZones,
          [zone.id]: {
            ...zone,
            deviceId: device.id,
          },
        }),
        {},
      ),
    }),
    {},
  )))
;

/*
 * RACHIO_PUT_DEVICE_ON
 */
export const putDeviceOn = (
  state: AppState,
  action: ActionTypes.Interface['RACHIO_PUT_DEVICE_ON'],
) => state
  .setIn(paths.thinking(), true)
;

/*
 * RACHIO_PUT_DEVICE_ON_SUCCESS
 */
export const putDeviceOnSuccess = (
  state: AppState,
  { payload }: ActionTypes.Interface['RACHIO_PUT_DEVICE_ON_SUCCESS'],
) => state
  .setIn(paths.thinking(), false)
  .setIn(paths.errors(), null)
  .setIn(paths.deviceOn(payload.id), true)
;

/*
 * RACHIO_PUT_DEVICE_OFF
 */
export const putDeviceOff = (
  state: AppState,
  action: ActionTypes.Interface['RACHIO_PUT_DEVICE_OFF'],
) => state
  .setIn(paths.thinking(), true)
;

/*
 * RACHIO_PUT_DEVICE_OFF_SUCCESS
 */
export const putDeviceOffSuccess = (
  state: AppState,
  { payload }: ActionTypes.Interface['RACHIO_PUT_DEVICE_OFF_SUCCESS'],
) => state
  .setIn(paths.thinking(), false)
  .setIn(paths.errors(), null)
  .setIn(paths.deviceOn(payload.id), false)
;

/*
 * RACHIO_GET_DEVICE_STATE
 */
export const getDeviceState = (
  state: AppState,
  action: ActionTypes.Interface['RACHIO_GET_DEVICE_STATE'],
) => state
  .setIn(paths.polling(), true)
;

/*
 * RACHIO_GET_DEVICE_STATE_SUCCESS
 */
export const getDeviceStateSuccess = (
  state: AppState,
  { payload: { response } }: ActionTypes.Interface['RACHIO_GET_DEVICE_STATE_SUCCESS'],
) => {
  let newState = state
    .setIn(paths.polling(), false)
    .setIn(paths.errors(), null)
    .setIn(
      paths.deviceState(response.state.deviceId),
      fromJS(response.state),
    )
  ;
  const { deviceId, currentRunningZone } = response.state || {};
  const status = response.state?.state;
  if (!deviceId) {
    return state;
  }
  const zones: DataTypes.Zones = state
    .getIn(paths.zones())
    .filter(
      (zone: DataTypes.Zone) => zone.get('deviceId') === deviceId
    )
  ;
  if (currentRunningZone) {
    const runningZoneId: string | undefined = zones
      ?.find(
        zone =>
        zone.get('deviceId') === deviceId &&
        zone.get('zoneNumber') === currentRunningZone.zoneNumber
      )
      ?.get('id')
    ;
    if (runningZoneId) {
      // set to running
      newState = newState
        .setIn(
          paths.zoneRunning(runningZoneId),
          true,
        )
      ;
    }
  } else if (status !== 'WATERING') {
    // set all to not running
    zones?.keySeq().forEach(zoneId => {
      newState = newState
        .setIn(
          paths.zoneRunning(zoneId),
          false,
        )
      ;
    })
    
  }
  return newState;
};

/*
 * RACHIO_GET_DEVICE_ZONE_SUMMARY
 */
export const getDeviceZoneSummary = (
  state: AppState,
  action: ActionTypes.Interface['RACHIO_GET_DEVICE_ZONE_SUMMARY'],
) => state
  .setIn(paths.polling(), true)
;

/*
 * RACHIO_GET_DEVICE_ZONE_SUMMARY_SUCCESS
 */
export const getDeviceZoneSummarySuccess = (
  state: AppState,
  { payload }: ActionTypes.Interface['RACHIO_GET_DEVICE_ZONE_SUMMARY_SUCCESS'],
) => {
  let newState: AppState = state
    .setIn(paths.polling(), false)
    .setIn(paths.errors(), null)
  ;
  if (payload?.response?.zoneSummary) {
    payload.response.zoneSummary.forEach((zoneSummary: any) => {
      const { zoneDetail, zoneState } = zoneSummary;
      newState = newState.setIn(
        paths.zoneState(zoneDetail.id),
        zoneState,
      )
    })
  }
  return newState;
};

/*
 * RACHIO_PUT_ZONE_START
 */
export const putZoneStart = (
  state: AppState,
  action: ActionTypes.Interface['RACHIO_PUT_ZONE_START'],
) => state
  .setIn(paths.thinking(), true)
;

/*
 * RACHIO_PUT_ZONE_START_SUCCESS
 */
export const putZoneStartSuccess = (
  state: AppState,
  { payload }: ActionTypes.Interface['RACHIO_PUT_ZONE_START_SUCCESS'],
) => state
  .setIn(paths.thinking(), false)
  .setIn(paths.zoneRunning(payload.id), true)
;

/*
 * RACHIO_API_ERROR
 */
export const apiError = (
  state: AppState,
  { payload }: ActionTypes.Interface['RACHIO_API_ERROR'],
) => {
  const { response } = payload;
  let newState = state.setIn(paths.thinking(), false);
  if (response.errors) {
    newState = newState.updateIn(
      paths.errors(),
      errors => {
        let updatedErrors = errors || fromJS([]);
        response.errors.forEach(error => {
          updatedErrors = updatedErrors.push(fromJS(error));
        });
        return updatedErrors;
      }
    );
  } else {
    newState = newState.updateIn(
      paths.errors(),
      errors => errors ? errors.push(fromJS(response)) : fromJS([response]),
    );
  }
  return newState;
};

/*
 * RACHIO_LEGACY_API_ERROR
 */
export const legacyApiError = (
  state: AppState,
  { payload }: ActionTypes.Interface['RACHIO_LEGACY_API_ERROR'],
) => state
  .setIn(paths.polling(), false)
  .updateIn(
    paths.errors(),
    errors => errors ? errors.push(fromJS(payload.response)) : fromJS([payload.response]),
  )
;

/*
 * RACHIO_DISMISS_ERROR
 */
export const dismissError = (
  state: AppState,
  { payload }: ActionTypes.Interface['RACHIO_DISMISS_ERROR'],
) => state
  .setIn(
    paths.errors(),
    state
      .getIn(paths.errors())
      .delete(payload.key)
  )
;

/*
 * RACHIO_CLEAR_DATA
 */
export const clearData = (
  state: AppState,
  action: ActionTypes.Interface['RACHIO_CLEAR_DATA'],
) => state
  .setIn(paths.devices(), undefined)
  .setIn(paths.zones(), undefined)
  .setIn(paths.errors(), undefined)
  .setIn(paths.thinking(), false)
  .setIn(paths.polling(), false)
;

/*
 * default export
 */
export default {
  [ActionTypes.RACHIO_GET_SELF_ID as string]: getId,
  [ActionTypes.RACHIO_GET_SELF_ID_SUCCESS as string]: getIdSuccess,
  [ActionTypes.RACHIO_GET_PERSON as string]: getPerson,
  [ActionTypes.RACHIO_GET_PERSON_SUCCESS as string]: getPersonSuccess,
  [ActionTypes.RACHIO_PUT_DEVICE_ON as string]: putDeviceOn,
  [ActionTypes.RACHIO_PUT_DEVICE_ON_SUCCESS as string]: putDeviceOnSuccess,
  [ActionTypes.RACHIO_PUT_DEVICE_OFF as string]: putDeviceOff,
  [ActionTypes.RACHIO_PUT_DEVICE_OFF_SUCCESS as string]: putDeviceOffSuccess,
  [ActionTypes.RACHIO_GET_DEVICE_STATE as string]: getDeviceState,
  [ActionTypes.RACHIO_GET_DEVICE_STATE_SUCCESS as string]: getDeviceStateSuccess,
  [ActionTypes.RACHIO_GET_DEVICE_ZONE_SUMMARY as string]: getDeviceZoneSummary,
  [ActionTypes.RACHIO_GET_DEVICE_ZONE_SUMMARY_SUCCESS as string]: getDeviceZoneSummarySuccess,
  [ActionTypes.RACHIO_PUT_ZONE_START as string]: putZoneStart,
  [ActionTypes.RACHIO_PUT_ZONE_START_SUCCESS as string]: putZoneStartSuccess,
  [ActionTypes.RACHIO_API_ERROR as string]: apiError,
  [ActionTypes.RACHIO_LEGACY_API_ERROR as string]: legacyApiError,
  [ActionTypes.RACHIO_DISMISS_ERROR as string]: dismissError,
  [ActionTypes.RACHIO_CLEAR_DATA as string]: clearData,
};
