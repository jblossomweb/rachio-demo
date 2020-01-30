import { Dispatch, AnyAction } from 'redux';

import * as Legacy from 'app/services/legacy/types';
import * as Rachio from 'app/services/rachio/types';

import * as action from './creators';

export const getSelfId = (
  service: Rachio.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => service.getSelfId().then(
  (response) => dispatch(
    action.getSelfIdSuccess(response as Rachio.ResponseInterface['getSelfIdSuccess']),
  ),
  (error) => dispatch(
    action.apiError(error as Rachio.ResponseInterface['error']),
  ),
);

export const getPerson = (
  id: Rachio.RequestInterface['getPerson']['id'],
  service: Rachio.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => service.getPerson(id).then(
  (response) => dispatch(
    action.getPersonSuccess(response as Rachio.ResponseInterface['getPersonSuccess']),
  ),
  (error) => dispatch(
    action.apiError(error as Rachio.ResponseInterface['error']),
  ),
);

export const getDeviceState = (
  id: Legacy.RequestInterface['getDeviceState']['id'],
  service: Legacy.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => service.getDeviceState(id).then(
  (response) => dispatch(
    action.getDeviceStateSuccess(response as Legacy.ResponseInterface['getDeviceStateSuccess']),
  ),
  (error) => dispatch(
    action.legacyApiError(error as Legacy.ResponseInterface['error']),
  ),
);

export const putDeviceOn = (
  id: Rachio.RequestInterface['putDeviceOn']['id'],
  service: Rachio.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => service.putDeviceOn(id).then(
  () => dispatch(
    action.putDeviceOnSuccess(id),
  ),
  (error) => dispatch(
    action.apiError(error as Rachio.ResponseInterface['error']),
  ),
);

export const putDeviceOff = (
  id: Rachio.RequestInterface['putDeviceOff']['id'],
  service: Rachio.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => service.putDeviceOff(id).then(
  () => dispatch(
    action.putDeviceOffSuccess(id),
  ),
  (error) => dispatch(
    action.apiError(error as Rachio.ResponseInterface['error']),
  ),
);
