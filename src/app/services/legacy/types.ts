import { RestInterface } from 'core/rest/types';
import * as AppTypes from 'app/types';

export interface RequestInterface {
  getLocations: {},
  getDeviceState: { id: AppTypes.Device['id'] },
};

export interface ResponseInterface {
  getLocationsSuccess: any, // TODO
  getDeviceStateSuccess: { state: AppTypes.DeviceState },
  error: { code?: string, message: string },
};

export interface ServiceRestInterface {
  get: RestInterface['get'],
};

export interface ServiceInterface {

  getLocations: (
  ) => Promise<
    ResponseInterface['getLocationsSuccess'] |
    ResponseInterface['error']
  >,

  getDeviceState: (
    id: RequestInterface['getDeviceState']['id'],
  ) => Promise<
    ResponseInterface['getDeviceStateSuccess'] |
    ResponseInterface['error']
  >,

};
