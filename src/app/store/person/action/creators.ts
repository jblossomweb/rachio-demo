import { Dispatch, AnyAction } from 'redux';
import {
  ServiceInterface,
  RequestInterface,
  ResponseInterface,
} from 'app/services/rachio/types';

import * as ActionTypes from './types';
import * as thunks from './thunks';


/*
 * PERSON_GET_ID
 */

export const getId: (
  service: ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => ActionTypes.Interface['PERSON_GET_ID'] = (
  service: ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => {
  thunks.getId(service)(dispatch);
  return {
    type: ActionTypes.PERSON_GET_ID,
  };
};

/*
 * PERSON_GET_ID_SUCCESS
 */
export const getIdSuccess: (
  response: ResponseInterface['getSelfIdSuccess'],
) => ActionTypes.Interface['PERSON_GET_ID_SUCCESS'] = response => ({
  type: ActionTypes.PERSON_GET_ID_SUCCESS,
  payload: {
    response,
  },
});

/*
 * PERSON_GET_ID_ERROR
 */
export const getIdError: (
  response: ResponseInterface['getSelfIdError'],
) => ActionTypes.Interface['PERSON_GET_ID_ERROR'] = response => ({
  type: ActionTypes.PERSON_GET_ID_ERROR,
  payload: {
    response,
  },
});

/*
 * PERSON_GET_PERSON
 */

export const getPerson: (
  id: RequestInterface['getPerson']['id'],
  service: ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => ActionTypes.Interface['PERSON_GET_PERSON'] = (
  id: RequestInterface['getPerson']['id'],
  service: ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => {
  thunks.getPerson(id, service)(dispatch);
  return {
    type: ActionTypes.PERSON_GET_PERSON,
  };
};

/*
 * PERSON_GET_PERSON_SUCCESS
 */
export const getPersonSuccess: (
  response: ResponseInterface['getPersonSuccess'],
) => ActionTypes.Interface['PERSON_GET_PERSON_SUCCESS'] = response => ({
  type: ActionTypes.PERSON_GET_PERSON_SUCCESS,
  payload: {
    response,
  },
});

/*
 * PERSON_GET_PERSON_ERROR
 */
export const getPersonError: (
  response: ResponseInterface['getPersonError'],
) => ActionTypes.Interface['PERSON_GET_PERSON_ERROR'] = response => ({
  type: ActionTypes.PERSON_GET_PERSON_ERROR,
  payload: {
    response,
  },
});
