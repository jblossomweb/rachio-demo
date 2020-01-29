import { Dispatch, AnyAction } from 'redux';
import {
  ServiceInterface,
  RequestInterface,
  ResponseInterface,
} from 'app/services/rachio/types';

import * as ActionTypes from './types';
import * as thunks from './thunks';


/*
 * RACHIO_GET_SELF_ID
 */

export const getSelfId: (
  service: ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => ActionTypes.Interface['RACHIO_GET_SELF_ID'] = (
  service: ServiceInterface,
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
  response: ResponseInterface['getSelfIdSuccess'],
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
  id: RequestInterface['getPerson']['id'],
  service: ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => ActionTypes.Interface['RACHIO_GET_PERSON'] = (
  id: RequestInterface['getPerson']['id'],
  service: ServiceInterface,
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
  response: ResponseInterface['getPersonSuccess'],
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
  id: RequestInterface['putDeviceOn']['id'],
  service: ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => ActionTypes.Interface['RACHIO_PUT_DEVICE_ON'] = (
  id: RequestInterface['putDeviceOn']['id'],
  service: ServiceInterface,
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
  id: RequestInterface['putDeviceOn']['id'],
) => ActionTypes.Interface['RACHIO_PUT_DEVICE_ON_SUCCESS'] = id => ({
  type: ActionTypes.RACHIO_PUT_DEVICE_ON_SUCCESS,
  payload: { id },
});

/*
 * RACHIO_PUT_DEVICE_OFF
 */

export const putDeviceOff: (
  id: RequestInterface['putDeviceOff']['id'],
  service: ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => ActionTypes.Interface['RACHIO_PUT_DEVICE_OFF'] = (
  id: RequestInterface['putDeviceOff']['id'],
  service: ServiceInterface,
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
  id: RequestInterface['putDeviceOff']['id'],
) => ActionTypes.Interface['RACHIO_PUT_DEVICE_OFF_SUCCESS'] = id => ({
  type: ActionTypes.RACHIO_PUT_DEVICE_OFF_SUCCESS,
  payload: { id },
});

/*
 * RACHIO_API_ERROR
 */
export const apiError: (
  response: ResponseInterface['error'],
) => ActionTypes.Interface['RACHIO_API_ERROR'] = response => ({
  type: ActionTypes.RACHIO_API_ERROR,
  payload: {
    response,
  },
});
