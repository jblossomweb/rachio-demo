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
  getSelfIdSuccess: { id: AppTypes.Person['id'] },
  getSelfIdError: ResponseErrors,
  getPersonSuccess: AppTypes.Person,
  getPersonError: ResponseErrors,
  getDeviceSuccess: AppTypes.Device,
  getDeviceError: ResponseErrors,
  getDeviceScheduleSuccess: any, // TODO: success response typing for getDeviceSchedule
  getDeviceScheduleError: ResponseErrors,
  getDeviceEventsSuccess: any[], // TODO: success response typing for getDeviceEvents
  getDeviceEventsError: ResponseErrors,
  getDeviceForecastSuccess: {
    current: AppTypes.Forecast,
    forecast: AppTypes.Forecast[],
  },
  getDeviceForecastError: ResponseErrors,
  putDeviceStopWaterSuccess: null | undefined, // 204 no response
  putDeviceStopWaterError: ResponseErrors,
  putDeviceRainDelaySuccess: null | undefined, // 204 no response
  putDeviceRainDelayError: ResponseErrors,
  putDeviceOnSuccess: null | undefined, // 204 no response
  putDeviceOnError: ResponseErrors,
  putDeviceOffSuccess: null | undefined, // 204 no response
  putDeviceOffError: ResponseErrors,
  putDevicePauseZoneRunSuccess: null | undefined, // 204 no response
  putDevicePauseZoneRunError: ResponseErrors,
  putDeviceResumeZoneRunSuccess: null | undefined, // 204 no response
  putDeviceResumeZoneRunError: ResponseErrors,
  getZoneSuccess: AppTypes.Zone,
  getZoneError: ResponseErrors,
  putZoneStartSuccess: null | undefined, // 204 no response
  putZoneStartError: ResponseErrors,
};

export interface ServiceRestInterface {
  get: RestInterface['get'],
  put: RestInterface['put'],
};

export interface ServiceInterface {

  getSelfId: (
  ) => Promise<
    ResponseInterface['getSelfIdSuccess'] |
    ResponseInterface['getSelfIdError']
  >,

  getPerson: (
    id: RequestInterface['getPerson']['id'],
  ) => Promise<
    ResponseInterface['getPersonSuccess'] |
    ResponseInterface['getPersonError']
  >,

  getDevice: (
    id: RequestInterface['getDevice']['id'],
  ) => Promise<
    ResponseInterface['getDeviceSuccess'] |
    ResponseInterface['getDeviceError']
  >,

  getDeviceSchedule: (
    id: RequestInterface['getDeviceSchedule']['id'],
  ) => Promise<
    ResponseInterface['getDeviceScheduleSuccess'] |
    ResponseInterface['getDeviceScheduleError']
  >,

  getDeviceEvents: (
    id: RequestInterface['getDeviceEvents']['id'],
    startTime: RequestInterface['getDeviceEvents']['startTime'],
    endTime: RequestInterface['getDeviceEvents']['endTime'],
  ) => Promise<
    ResponseInterface['getDeviceEventsSuccess'] |
    ResponseInterface['getDeviceEventsError']
  >,

  getDeviceForecast: (
    id: RequestInterface['getDeviceForecast']['id'],
    units: RequestInterface['getDeviceForecast']['units'],
  ) => Promise<
    ResponseInterface['getDeviceForecastSuccess'] |
    ResponseInterface['getDeviceForecastError']
  >,

  putDeviceStopWater: (
    id: RequestInterface['putDeviceStopWater']['id'],
  ) => Promise<
    ResponseInterface['putDeviceStopWaterSuccess'] |
    ResponseInterface['putDeviceStopWaterError']
  >,

  putDeviceRainDelay: (
    id: RequestInterface['putDeviceRainDelay']['id'],
  ) => Promise<
    ResponseInterface['putDeviceRainDelaySuccess'] |
    ResponseInterface['putDeviceRainDelayError']
  >,

  putDeviceOn: (
    id: RequestInterface['putDeviceOn']['id'],
  ) => Promise<
    ResponseInterface['putDeviceOnSuccess'] |
    ResponseInterface['putDeviceOnError']
  >,

  putDeviceOff: (
    id: RequestInterface['putDeviceOff']['id'],
  ) => Promise<
    ResponseInterface['putDeviceOffSuccess'] |
    ResponseInterface['putDeviceOffError']
  >,

  putDevicePauseZoneRun: (
    id: RequestInterface['putDevicePauseZoneRun']['id'],
  ) => Promise<
    ResponseInterface['putDevicePauseZoneRunSuccess'] |
    ResponseInterface['putDevicePauseZoneRunError']
  >,

  putDeviceResumeZoneRun: (
    id: RequestInterface['putDeviceResumeZoneRun']['id'],
  ) => Promise<
    ResponseInterface['putDeviceResumeZoneRunSuccess'] |
    ResponseInterface['putDeviceResumeZoneRunError']
  >,

  getZone: (
    id: RequestInterface['getZone']['id'],
  ) => Promise<
    ResponseInterface['getZoneSuccess'] |
    ResponseInterface['getZoneError']
  >,

  putZoneStart: (
    id: RequestInterface['putZoneStart']['id'],
    duration: RequestInterface['putZoneStart']['duration'],
  ) => Promise<
    ResponseInterface['putZoneStartSuccess'] |
    ResponseInterface['putZoneStartError']
  >,

};
