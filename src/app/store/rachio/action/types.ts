// import * as AppTypes from 'app/types';
import { ResponseInterface } from 'app/services/rachio/types';

export const RACHIO_GET_SELF_ID = 'RACHIO_GET_SELF_ID';
export const RACHIO_GET_SELF_ID_SUCCESS = 'RACHIO_GET_SELF_ID_SUCCESS';

export const RACHIO_GET_PERSON = 'RACHIO_GET_PERSON';
export const RACHIO_GET_PERSON_SUCCESS = 'RACHIO_GET_PERSON_SUCCESS';

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

  [RACHIO_API_ERROR]: {
    type: 'RACHIO_API_ERROR',
    payload: {
      response: ResponseInterface['error'],
    },
  },

};
