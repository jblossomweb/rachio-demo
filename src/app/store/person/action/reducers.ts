import { fromJS } from 'immutable';
import { AppState } from 'core/store';

import paths from '../paths';
import * as types from './types';

/*
 * PERSON_GET_ID
 */
export const getId = (
  state: AppState,
  action: types.Interface['PERSON_GET_ID'],
) => state
  .setIn(paths.thinking(), true)
;

/*
 * PERSON_GET_ID_SUCCESS
 */
export const getIdSuccess = (
  state: AppState,
  { payload }: types.Interface['PERSON_GET_ID_SUCCESS'],
) => state
  .setIn(paths.thinking(), false)
  .setIn(paths.errors(), null)
  .setIn(paths.id(), payload.response.id)
;

/*
 * PERSON_GET_ID_ERROR
 */
export const getIdError = (
  state: AppState,
  { payload }: types.Interface['PERSON_GET_ID_ERROR'],
) => state
  .setIn(paths.thinking(), false)
  .setIn(paths.errors(), fromJS(payload.response.errors))
;

/*
 * PERSON_GET_PERSON
 */
export const getPerson = (
  state: AppState,
  action: types.Interface['PERSON_GET_PERSON'],
) => state
  .setIn(paths.thinking(), true)
;

/*
 * PERSON_GET_PERSON_SUCCESS
 */
export const getPersonSuccess = (
  state: AppState,
  { payload }: types.Interface['PERSON_GET_PERSON_SUCCESS'],
) => state
  .setIn(paths.thinking(), false)
  .setIn(paths.errors(), null)
  .setIn(paths.person(), payload.response)
;

/*
 * PERSON_GET_PERSON_ERROR
 */
export const getPersonError = (
  state: AppState,
  { payload }: types.Interface['PERSON_GET_PERSON_ERROR'],
) => state
  .setIn(paths.thinking(), false)
  .setIn(paths.errors(), fromJS(payload.response.errors))
;

/*
 * default export
 */
export default {
  [types.PERSON_GET_ID as string]: getId,
  [types.PERSON_GET_ID_SUCCESS as string]: getIdSuccess,
  [types.PERSON_GET_ID_ERROR as string]: getIdError,
  [types.PERSON_GET_PERSON as string]: getPerson,
  [types.PERSON_GET_PERSON_SUCCESS as string]: getPersonSuccess,
  [types.PERSON_GET_PERSON_ERROR as string]: getPersonError,
};
