import { fromJS } from 'immutable';
import { AppState } from 'core/store';
import omit from 'lodash/omit';

import paths from '../paths';
import * as types from './types';

/*
 * RACHIO_GET_SELF_ID
 */
export const getId = (
  state: AppState,
  action: types.Interface['RACHIO_GET_SELF_ID'],
) => state
  .setIn(paths.thinking(), true)
;

/*
 * RACHIO_GET_SELF_ID_SUCCESS
 */
export const getIdSuccess = (
  state: AppState,
  { payload }: types.Interface['RACHIO_GET_SELF_ID_SUCCESS'],
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
  action: types.Interface['RACHIO_GET_PERSON'],
) => state
  .setIn(paths.thinking(), true)
;

/*
 * RACHIO_GET_PERSON_SUCCESS
 */
export const getPersonSuccess = (
  state: AppState,
  { payload }: types.Interface['RACHIO_GET_PERSON_SUCCESS'],
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
 * RACHIO_API_ERROR
 */
export const apiError = (
  state: AppState,
  { payload }: types.Interface['RACHIO_API_ERROR'],
) => state
  .setIn(paths.thinking(), false)
  .setIn(paths.errors(), fromJS(payload.response.errors))
;

/*
 * default export
 */
export default {
  [types.RACHIO_GET_SELF_ID as string]: getId,
  [types.RACHIO_GET_SELF_ID_SUCCESS as string]: getIdSuccess,
  [types.RACHIO_GET_PERSON as string]: getPerson,
  [types.RACHIO_GET_PERSON_SUCCESS as string]: getPersonSuccess,
  [types.RACHIO_API_ERROR as string]: apiError,
};
