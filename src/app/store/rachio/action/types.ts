// import * as AppTypes from 'app/types';
import { ResponseInterface, RequestInterface } from 'app/services/rachio/types';

export const RACHIO_GET_SELF_ID = 'RACHIO_GET_SELF_ID';
export const RACHIO_GET_SELF_ID_SUCCESS = 'RACHIO_GET_SELF_ID_SUCCESS';

export const RACHIO_GET_PERSON = 'RACHIO_GET_PERSON';
export const RACHIO_GET_PERSON_SUCCESS = 'RACHIO_GET_PERSON_SUCCESS';

export const RACHIO_PUT_DEVICE_ON = 'RACHIO_PUT_DEVICE_ON';
export const RACHIO_PUT_DEVICE_ON_SUCCESS = 'RACHIO_PUT_DEVICE_ON_SUCCESS';

export const RACHIO_PUT_DEVICE_OFF = 'RACHIO_PUT_DEVICE_OFF';
export const RACHIO_PUT_DEVICE_OFF_SUCCESS = 'RACHIO_PUT_DEVICE_OFF_SUCCESS';

export const RACHIO_API_ERROR = 'RACHIO_API_ERROR';

export interface Interface {

  [RACHIO_GET_SELF_ID]: {
    type: 'RACHIO_GET_SELF_ID',
  },

  [RACHIO_GET_SELF_ID_SUCCESS]: {
    type: 'RACHIO_GET_SELF_ID_SUCCESS',
    payload: {
      response: ResponseInterface['getSelfIdSuccess'],
    },
  },

  [RACHIO_GET_PERSON]: {
    type: 'RACHIO_GET_PERSON',
  },

  [RACHIO_GET_PERSON_SUCCESS]: {
    type: 'RACHIO_GET_PERSON_SUCCESS',
    payload: {
      response: ResponseInterface['getPersonSuccess'],
    },
  },

  [RACHIO_PUT_DEVICE_ON]: {
    type: 'RACHIO_PUT_DEVICE_ON',
    payload: {
      id: RequestInterface['putDeviceOn']['id'],
    },
  },

  [RACHIO_PUT_DEVICE_ON_SUCCESS]: {
    type: 'RACHIO_PUT_DEVICE_ON_SUCCESS',
    payload: {
      id: RequestInterface['putDeviceOn']['id'],
    },
  },

  [RACHIO_PUT_DEVICE_OFF]: {
    type: 'RACHIO_PUT_DEVICE_OFF',
    payload: {
      id: RequestInterface['putDeviceOn']['id'],
    },
  },

  [RACHIO_PUT_DEVICE_OFF_SUCCESS]: {
    type: 'RACHIO_PUT_DEVICE_OFF_SUCCESS',
    payload: {
      id: RequestInterface['putDeviceOn']['id'],
    },
  },

  [RACHIO_API_ERROR]: {
    type: 'RACHIO_API_ERROR',
    payload: {
      response: ResponseInterface['error'],
    },
  },

};
