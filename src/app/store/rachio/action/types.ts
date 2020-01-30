// import * as AppTypes from 'app/types';
import * as Rachio from 'app/services/rachio/types';
import * as Legacy from 'app/services/legacy/types';

export const RACHIO_GET_SELF_ID = 'RACHIO_GET_SELF_ID';
export const RACHIO_GET_SELF_ID_SUCCESS = 'RACHIO_GET_SELF_ID_SUCCESS';

export const RACHIO_GET_PERSON = 'RACHIO_GET_PERSON';
export const RACHIO_GET_PERSON_SUCCESS = 'RACHIO_GET_PERSON_SUCCESS';

export const RACHIO_PUT_DEVICE_ON = 'RACHIO_PUT_DEVICE_ON';
export const RACHIO_PUT_DEVICE_ON_SUCCESS = 'RACHIO_PUT_DEVICE_ON_SUCCESS';

export const RACHIO_PUT_DEVICE_OFF = 'RACHIO_PUT_DEVICE_OFF';
export const RACHIO_PUT_DEVICE_OFF_SUCCESS = 'RACHIO_PUT_DEVICE_OFF_SUCCESS';

export const RACHIO_GET_DEVICE_STATE = 'RACHIO_GET_DEVICE_STATE';
export const RACHIO_GET_DEVICE_STATE_SUCCESS = 'RACHIO_GET_DEVICE_STATE_SUCCESS';

export const RACHIO_CLEAR_DATA = 'RACHIO_CLEAR_DATA';

export const RACHIO_API_ERROR = 'RACHIO_API_ERROR';
export const RACHIO_LEGACY_API_ERROR = 'RACHIO_LEGACY_API_ERROR';

export interface Interface {

  [RACHIO_GET_SELF_ID]: {
    type: 'RACHIO_GET_SELF_ID',
  },

  [RACHIO_GET_SELF_ID_SUCCESS]: {
    type: 'RACHIO_GET_SELF_ID_SUCCESS',
    payload: {
      response: Rachio.ResponseInterface['getSelfIdSuccess'],
    },
  },

  [RACHIO_GET_PERSON]: {
    type: 'RACHIO_GET_PERSON',
  },

  [RACHIO_GET_PERSON_SUCCESS]: {
    type: 'RACHIO_GET_PERSON_SUCCESS',
    payload: {
      response: Rachio.ResponseInterface['getPersonSuccess'],
    },
  },

  [RACHIO_PUT_DEVICE_ON]: {
    type: 'RACHIO_PUT_DEVICE_ON',
    payload: {
      id: Rachio.RequestInterface['putDeviceOn']['id'],
    },
  },

  [RACHIO_PUT_DEVICE_ON_SUCCESS]: {
    type: 'RACHIO_PUT_DEVICE_ON_SUCCESS',
    payload: {
      id: Rachio.RequestInterface['putDeviceOn']['id'],
    },
  },

  [RACHIO_PUT_DEVICE_OFF]: {
    type: 'RACHIO_PUT_DEVICE_OFF',
    payload: {
      id: Rachio.RequestInterface['putDeviceOn']['id'],
    },
  },

  [RACHIO_PUT_DEVICE_OFF_SUCCESS]: {
    type: 'RACHIO_PUT_DEVICE_OFF_SUCCESS',
    payload: {
      id: Rachio.RequestInterface['putDeviceOn']['id'],
    },
  },

  [RACHIO_GET_DEVICE_STATE]: {
    type: 'RACHIO_GET_DEVICE_STATE',
    payload: {
      id: Legacy.RequestInterface['getDeviceState']['id'],
    },
  },

  [RACHIO_GET_DEVICE_STATE_SUCCESS]: {
    type: 'RACHIO_GET_DEVICE_STATE_SUCCESS',
    payload: {
      response: Legacy.ResponseInterface['getDeviceStateSuccess'],
    },
  },

  [RACHIO_API_ERROR]: {
    type: 'RACHIO_API_ERROR',
    payload: {
      response: Rachio.ResponseInterface['error'],
    },
  },

  [RACHIO_LEGACY_API_ERROR]: {
    type: 'RACHIO_LEGACY_API_ERROR',
    payload: {
      response: Legacy.ResponseInterface['error'],
    },
  },

  [RACHIO_CLEAR_DATA]: {
    type: 'RACHIO_CLEAR_DATA',
  },

};
