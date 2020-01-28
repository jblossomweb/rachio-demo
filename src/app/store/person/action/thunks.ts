import { Dispatch, AnyAction } from 'redux';
import {
  ServiceInterface,
  RequestInterface,
  ResponseInterface,
} from 'app/services/rachio/types';

import * as action from './creators';

export const getId = (
  service: ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
) => service.getSelfId().then(
  (response) => dispatch(
    action.getIdSuccess(response as ResponseInterface['getSelfIdSuccess']),
  ),
  (error) => dispatch(
    action.getIdError(error as ResponseInterface['getSelfIdError']),
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
    action.getPersonError(error as ResponseInterface['getPersonError']),
  ),
);
