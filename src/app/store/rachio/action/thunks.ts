import { Dispatch, AnyAction } from 'redux';
import {
  ServiceInterface,
  RequestInterface,
  ResponseInterface,
} from 'app/services/rachio/types';

import * as action from './creators';

export const getSelfId = (
  service: ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => service.getSelfId().then(
  (response) => dispatch(
    action.getSelfIdSuccess(response as ResponseInterface['getSelfIdSuccess']),
  ),
  (error) => dispatch(
    action.apiError(error as ResponseInterface['error']),
  ),
);

export const getPerson = (
  id: RequestInterface['getPerson']['id'],
  service: ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => service.getPerson(id).then(
  (response) => dispatch(
    action.getPersonSuccess(response as ResponseInterface['getPersonSuccess']),
  ),
  (error) => dispatch(
    action.apiError(error as ResponseInterface['error']),
  ),
);

// export const putDeviceOn = (
//   id: RequestInterface['getDevice']['id'],
//   service: ServiceInterface,
// ) => (
//   dispatch: Dispatch<AnyAction>,
// ) => service.putDeviceOn(id).then(
//   () => dispatch(
//     action.putDeviceOnSuccess(),
//   ),
//   (error) => dispatch(
//     action.apiError(error as ResponseInterface['error']),
//   ),
// );
