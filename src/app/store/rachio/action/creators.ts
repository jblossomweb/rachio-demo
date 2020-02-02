import { Dispatch, AnyAction } from 'redux';

import { Types as Rachio } from 'app/services/rachio';
import { Types as Legacy } from 'app/services/legacy';
import * as ActionTypes from './types';
import * as thunks from './thunks';


/*
 * RACHIO_GET_SELF_ID
 */

export const getSelfId: (
  service: Rachio.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => ActionTypes.Interface['RACHIO_GET_SELF_ID'] = (
  service: Rachio.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => {
  thunks.getSelfId(service)(dispatch);
  return {
    type: ActionTypes.RACHIO_GET_SELF_ID,
  };
};

/*
 * RACHIO_GET_SELF_ID_SUCCESS
 */
export const getSelfIdSuccess: (
  response: Rachio.ResponseInterface['getSelfIdSuccess'],
) => ActionTypes.Interface['RACHIO_GET_SELF_ID_SUCCESS'] = response => ({
  type: ActionTypes.RACHIO_GET_SELF_ID_SUCCESS,
  payload: {
    response,
  },
});

/*
 * RACHIO_GET_PERSON
 */

export const getPerson: (
  id: Rachio.RequestInterface['getPerson']['id'],
  service: Rachio.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => ActionTypes.Interface['RACHIO_GET_PERSON'] = (
  id: Rachio.RequestInterface['getPerson']['id'],
  service: Rachio.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => {
  thunks.getPerson(id, service)(dispatch);
  return {
    type: ActionTypes.RACHIO_GET_PERSON,
  };
};

/*
 * RACHIO_GET_PERSON_SUCCESS
 */
export const getPersonSuccess: (
  response: Rachio.ResponseInterface['getPersonSuccess'],
) => ActionTypes.Interface['RACHIO_GET_PERSON_SUCCESS'] = response => ({
  type: ActionTypes.RACHIO_GET_PERSON_SUCCESS,
  payload: {
    response,
  },
});

/*
 * RACHIO_PUT_DEVICE_ON
 */

export const putDeviceOn: (
  id: Rachio.RequestInterface['putDeviceOn']['id'],
  service: Rachio.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => ActionTypes.Interface['RACHIO_PUT_DEVICE_ON'] = (
  id: Rachio.RequestInterface['putDeviceOn']['id'],
  service: Rachio.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => {
  thunks.putDeviceOn(id, service)(dispatch);
  return {
    type: ActionTypes.RACHIO_PUT_DEVICE_ON,
    payload: { id },
  };
};

/*
 * RACHIO_PUT_DEVICE_ON_SUCCESS
 */
export const putDeviceOnSuccess: (
  id: Rachio.RequestInterface['putDeviceOn']['id'],
) => ActionTypes.Interface['RACHIO_PUT_DEVICE_ON_SUCCESS'] = id => ({
  type: ActionTypes.RACHIO_PUT_DEVICE_ON_SUCCESS,
  payload: { id },
});

/*
 * RACHIO_PUT_DEVICE_OFF
 */

export const putDeviceOff: (
  id: Rachio.RequestInterface['putDeviceOff']['id'],
  service: Rachio.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => ActionTypes.Interface['RACHIO_PUT_DEVICE_OFF'] = (
  id: Rachio.RequestInterface['putDeviceOff']['id'],
  service: Rachio.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => {
  thunks.putDeviceOff(id, service)(dispatch);
  return {
    type: ActionTypes.RACHIO_PUT_DEVICE_OFF,
    payload: { id },
  };
};

/*
 * RACHIO_PUT_DEVICE_OFF_SUCCESS
 */
export const putDeviceOffSuccess: (
  id: Rachio.RequestInterface['putDeviceOff']['id'],
) => ActionTypes.Interface['RACHIO_PUT_DEVICE_OFF_SUCCESS'] = id => ({
  type: ActionTypes.RACHIO_PUT_DEVICE_OFF_SUCCESS,
  payload: { id },
});

/*
 * RACHIO_GET_DEVICE_STATE
 */

export const getDeviceState: (
  id: Legacy.RequestInterface['getDeviceState']['id'],
  service: Legacy.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => ActionTypes.Interface['RACHIO_GET_DEVICE_STATE'] = (
  id: Legacy.RequestInterface['getDeviceState']['id'],
  service: Legacy.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => {
  thunks.getDeviceState(id, service)(dispatch);
  return {
    type: ActionTypes.RACHIO_GET_DEVICE_STATE,
    payload: { id },
  };
};

/*
 * RACHIO_GET_DEVICE_STATE_SUCCESS
 */
export const getDeviceStateSuccess: (
  response: Legacy.ResponseInterface['getDeviceStateSuccess'],
) => ActionTypes.Interface['RACHIO_GET_DEVICE_STATE_SUCCESS'] = response => ({
  type: ActionTypes.RACHIO_GET_DEVICE_STATE_SUCCESS,
  payload: {
    response,
  },
});

/*
 * RACHIO_GET_DEVICE_ZONE_SUMMARY
 */

export const getDeviceZoneSummary: (
  id: Legacy.RequestInterface['getDeviceZoneSummary']['id'],
  service: Legacy.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => ActionTypes.Interface['RACHIO_GET_DEVICE_ZONE_SUMMARY'] = (
  id: Legacy.RequestInterface['getDeviceZoneSummary']['id'],
  service: Legacy.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => {
  thunks.getDeviceZoneSummary(id, service)(dispatch);
  return {
    type: ActionTypes.RACHIO_GET_DEVICE_ZONE_SUMMARY,
    payload: { id },
  };
};

/*
 * RACHIO_GET_DEVICE_ZONE_SUMMARY_SUCCESS
 */
export const getDeviceZoneSummarySuccess: (
  response: Legacy.ResponseInterface['getDeviceZoneSummarySuccess'],
) => ActionTypes.Interface['RACHIO_GET_DEVICE_ZONE_SUMMARY_SUCCESS'] = response => ({
  type: ActionTypes.RACHIO_GET_DEVICE_ZONE_SUMMARY_SUCCESS,
  payload: {
    response,
  },
});

/*
 * RACHIO_PUT_ZONE_START
 */

export const putZoneStart: (
  id: Rachio.RequestInterface['putZoneStart']['id'],
  seconds: Rachio.RequestInterface['putZoneStart']['duration'],
  service: Rachio.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => ActionTypes.Interface['RACHIO_PUT_ZONE_START'] = (
  id: Rachio.RequestInterface['putZoneStart']['id'],
  seconds: Rachio.RequestInterface['putZoneStart']['duration'],
  service: Rachio.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => {
  thunks.putZoneStart(id, seconds, service)(dispatch);
  return {
    type: ActionTypes.RACHIO_PUT_ZONE_START,
    payload: { id, seconds },
  };
};

/*
 * RACHIO_PUT_ZONE_START_SUCCESS
 */
export const putZoneStartSuccess: (
  id: Rachio.RequestInterface['putZoneStart']['id'],
  seconds: Rachio.RequestInterface['putZoneStart']['duration'],
) => ActionTypes.Interface['RACHIO_PUT_ZONE_START_SUCCESS'] = (
  id: Rachio.RequestInterface['putZoneStart']['id'],
  seconds: Rachio.RequestInterface['putZoneStart']['duration'],
) => ({
  type: ActionTypes.RACHIO_PUT_ZONE_START_SUCCESS,
  payload: { id, seconds },
});

/*
 * RACHIO_PUT_ZONE_START_MULTIPLE
 */

export const putZoneStartMultiple: (
  zones: Rachio.RequestInterface['putZoneStartMultiple']['zones'],
  service: Rachio.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => ActionTypes.Interface['RACHIO_PUT_ZONE_START_MULTIPLE'] = (
  zones: Rachio.RequestInterface['putZoneStartMultiple']['zones'],
  service: Rachio.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => {
  thunks.putZoneStartMultiple(zones, service)(dispatch);
  return {
    type: ActionTypes.RACHIO_PUT_ZONE_START_MULTIPLE,
    payload: { zones },
  };
};

/*
 * RACHIO_PUT_ZONE_START_MULTIPLE_SUCCESS
 */
export const putZoneStartMultipleSuccess: (
  zones: Rachio.RequestInterface['putZoneStartMultiple']['zones'],
) => ActionTypes.Interface['RACHIO_PUT_ZONE_START_MULTIPLE_SUCCESS'] = (
  zones: Rachio.RequestInterface['putZoneStartMultiple']['zones'],
) => ({
  type: ActionTypes.RACHIO_PUT_ZONE_START_MULTIPLE_SUCCESS,
  payload: { zones },
});

/*
 * RACHIO_API_ERROR
 */
export const apiError: (
  response: Rachio.ResponseInterface['error'],
) => ActionTypes.Interface['RACHIO_API_ERROR'] = response => ({
  type: ActionTypes.RACHIO_API_ERROR,
  payload: {
    response,
  },
});

/*
 * RACHIO_LEGACY_API_ERROR
 */
export const legacyApiError: (
  response: Legacy.ResponseInterface['error'],
) => ActionTypes.Interface['RACHIO_LEGACY_API_ERROR'] = response => ({
  type: ActionTypes.RACHIO_LEGACY_API_ERROR,
  payload: {
    response,
  },
});

/*
 * RACHIO_DISMISS_ERROR
 */
export const dismissError: (key: number) => ActionTypes.Interface['RACHIO_DISMISS_ERROR'] = key => ({
  type: ActionTypes.RACHIO_DISMISS_ERROR,
  payload: {
    key,
  }
});

/*
 * RACHIO_CLEAR_DATA
 */
export const clearData: () => ActionTypes.Interface['RACHIO_CLEAR_DATA'] = () => ({
  type: ActionTypes.RACHIO_CLEAR_DATA,
});
