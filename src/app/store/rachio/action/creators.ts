import { Dispatch, AnyAction } from 'redux';

import * as Rachio from 'app/services/rachio/types';
import * as Legacy from 'app/services/legacy/types';
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
 * RACHIO_CLEAR_DATA
 */
export const clearData: () => ActionTypes.Interface['RACHIO_CLEAR_DATA'] = () => ({
  type: ActionTypes.RACHIO_CLEAR_DATA,
});
