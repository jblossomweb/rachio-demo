// import * as AppTypes from 'app/types';
import { ResponseInterface } from 'app/services/rachio/types';

export const PERSON_GET_ID = 'PERSON_GET_ID';
export const PERSON_GET_ID_SUCCESS = 'PERSON_GET_ID_SUCCESS';
export const PERSON_GET_ID_ERROR = 'PERSON_GET_ID_ERROR';

export const PERSON_GET_PERSON = 'PERSON_GET_PERSON';
export const PERSON_GET_PERSON_SUCCESS = 'PERSON_GET_PERSON_SUCCESS';
export const PERSON_GET_PERSON_ERROR = 'PERSON_GET_PERSON_ERROR';

export interface Interface {

  [PERSON_GET_ID]: {
    type: 'PERSON_GET_ID',
  },

  [PERSON_GET_ID_SUCCESS]: {
    type: 'PERSON_GET_ID_SUCCESS',
    payload: {
      response: ResponseInterface['getSelfIdSuccess'],
    },
  },

  [PERSON_GET_ID_ERROR]: {
    type: 'PERSON_GET_ID_ERROR',
    payload: {
      response: ResponseInterface['getSelfIdError'],
    },
  },

  [PERSON_GET_PERSON]: {
    type: 'PERSON_GET_PERSON',
  },

  [PERSON_GET_PERSON_SUCCESS]: {
    type: 'PERSON_GET_PERSON_SUCCESS',
    payload: {
      response: ResponseInterface['getPersonSuccess'],
    },
  },

  [PERSON_GET_PERSON_ERROR]: {
    type: 'PERSON_GET_PERSON_ERROR',
    payload: {
      response: ResponseInterface['getPersonError'],
    },
  },

};
