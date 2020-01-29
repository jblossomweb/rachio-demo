import { RestInterface } from 'core/rest/types';
import * as AppTypes from 'app/types';

export interface RequestInterface {
  getSelfId: {},
  getPerson: { id: AppTypes.Person['id'] },
  getDevice: { id: AppTypes.Device['id'] },
  getDeviceSchedule: { id: AppTypes.Device['id'] },
  getDeviceEvents: { id: AppTypes.Device['id'], startTime: number, endTime: number },
  getDeviceForecast: { id: AppTypes.Device['id'], units: AppTypes.Units },
  putDeviceStopWater: { id: AppTypes.Device['id'] },
  putDeviceRainDelay: { id: AppTypes.Device['id'] },
  putDeviceOn: { id: AppTypes.Device['id'] },
  putDeviceOff: { id: AppTypes.Device['id'] },
  putDevicePauseZoneRun: { id: AppTypes.Device['id'] },
  putDeviceResumeZoneRun: { id: AppTypes.Device['id'] },
  getZone: { id: AppTypes.Zone['id'] },
  putZoneStart: { id: AppTypes.Zone['id'], duration: number },
};

export interface ResponseError {
  message: string,
}

export interface ResponseErrors {
  errors: ResponseError[],
};

export interface ResponseInterface {
  error: ResponseErrors,
  putSuccess: null | undefined, // 204 no response
  getSelfIdSuccess: { id: AppTypes.Person['id'] },
  getPersonSuccess: AppTypes.RawPerson,
  getDeviceSuccess: AppTypes.RawDevice,
  getDeviceScheduleSuccess: any, // TODO: success response typing for getDeviceSchedule
  getDeviceEventsSuccess: any[], // TODO: success response typing for getDeviceEvents
  getDeviceForecastSuccess: {
    current: AppTypes.Forecast,
    forecast: AppTypes.Forecast[],
  },
};

export interface ServiceRestInterface {
  get: RestInterface['get'],
  put: RestInterface['put'],
};

export interface ServiceInterface {

  getSelfId: (
  ) => Promise<
    ResponseInterface['getSelfIdSuccess'] |
    ResponseInterface['error']
  >,

  getPerson: (
    id: RequestInterface['getPerson']['id'],
  ) => Promise<
    ResponseInterface['getPersonSuccess'] |
    ResponseInterface['error']
  >,

  getDevice: (
    id: RequestInterface['getDevice']['id'],
  ) => Promise<
    ResponseInterface['getDeviceSuccess'] |
    ResponseInterface['error']
  >,

  getDeviceSchedule: (
    id: RequestInterface['getDeviceSchedule']['id'],
  ) => Promise<
    ResponseInterface['getDeviceScheduleSuccess'] |
    ResponseInterface['error']
  >,

  getDeviceEvents: (
    id: RequestInterface['getDeviceEvents']['id'],
    startTime: RequestInterface['getDeviceEvents']['startTime'],
    endTime: RequestInterface['getDeviceEvents']['endTime'],
  ) => Promise<
    ResponseInterface['getDeviceEventsSuccess'] |
    ResponseInterface['error']
  >,

  getDeviceForecast: (
    id: RequestInterface['getDeviceForecast']['id'],
    units: RequestInterface['getDeviceForecast']['units'],
  ) => Promise<
    ResponseInterface['getDeviceForecastSuccess'] |
    ResponseInterface['error']
  >,

  putDeviceStopWater: (
    id: RequestInterface['putDeviceStopWater']['id'],
  ) => Promise<
    ResponseInterface['putSuccess'] |
    ResponseInterface['error']
  >,

  putDeviceRainDelay: (
    id: RequestInterface['putDeviceRainDelay']['id'],
  ) => Promise<
    ResponseInterface['putSuccess'] |
    ResponseInterface['error']
  >,

  putDeviceOn: (
    id: RequestInterface['putDeviceOn']['id'],
  ) => Promise<
    ResponseInterface['putSuccess'] |
    ResponseInterface['error']
  >,

  putDeviceOff: (
    id: RequestInterface['putDeviceOff']['id'],
  ) => Promise<
    ResponseInterface['putSuccess'] |
    ResponseInterface['error']
  >,

  putDevicePauseZoneRun: (
    id: RequestInterface['putDevicePauseZoneRun']['id'],
  ) => Promise<
    ResponseInterface['putSuccess'] |
    ResponseInterface['error']
  >,

  putDeviceResumeZoneRun: (
    id: RequestInterface['putDeviceResumeZoneRun']['id'],
  ) => Promise<
    ResponseInterface['putSuccess'] |
    ResponseInterface['error']
  >,

  getZone: (
    id: RequestInterface['getZone']['id'],
  ) => Promise<
    ResponseInterface['putSuccess'] |
    ResponseInterface['error']
  >,

  putZoneStart: (
    id: RequestInterface['putZoneStart']['id'],
    duration: RequestInterface['putZoneStart']['duration'],
  ) => Promise<
    ResponseInterface['putSuccess'] |
    ResponseInterface['error']
  >,

};
