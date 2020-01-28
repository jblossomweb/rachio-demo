import {
  promiseGet,
  promisePut,
} from 'core/rest/utils';

import * as Types from './types';

class RachioService implements Types.ServiceInterface {
  private apiUrl: string;
  private apiKey: string;
  private rest: Types.ServiceRestInterface;

  constructor (
    apiUrl: string,
    apiKey: string,
    rest: Types.ServiceRestInterface,
  ) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
    this.rest = rest;
  }

  public getSelfId () {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const endpoint = `/person/info`;
    const url = `${this.apiUrl}${endpoint}`;
    return promiseGet({
      url,
      headers,
    }, this.rest);
  }

  public getPerson (
    id: Types.RequestInterface['getPerson']['id'],
  ) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const endpoint = `/person/${id}`;
    const url = `${this.apiUrl}${endpoint}`;
    return promiseGet({
      url,
      headers,
    }, this.rest);
  }

  public getDevice (
    id: Types.RequestInterface['getDevice']['id'],
  ) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const endpoint = `/device/${id}`;
    const url = `${this.apiUrl}${endpoint}`;
    return promiseGet({
      url,
      headers,
    }, this.rest);
  }

  public getDeviceSchedule (
    id: Types.RequestInterface['getDeviceSchedule']['id'],
  ) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const endpoint = `/device/${id}/current_schedule`;
    const url = `${this.apiUrl}${endpoint}`;
    return promiseGet({
      url,
      headers,
    }, this.rest);
  }

  public getDeviceEvents (
    id: Types.RequestInterface['getDeviceEvents']['id'],
    startTime: Types.RequestInterface['getDeviceEvents']['startTime'],
    endTime: Types.RequestInterface['getDeviceEvents']['endTime'],
  ) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const endpoint = `/device/${id}/event?startTime=${startTime}&endTime=${endTime}`;
    const url = `${this.apiUrl}${endpoint}`;
    return promiseGet({
      url,
      headers,
    }, this.rest);
  }

  public getDeviceForecast (
    id: Types.RequestInterface['getDeviceForecast']['id'],
    units: Types.RequestInterface['getDeviceForecast']['units'],
  ) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const endpoint = `/device/${id}/forecast?units=${units}`;
    const url = `${this.apiUrl}${endpoint}`;
    return promiseGet({
      url,
      headers,
    }, this.rest);
  }

  public putDeviceStopWater (
    id: Types.RequestInterface['putDeviceStopWater']['id'],
  ) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const endpoint = `/device/stop_water`;
    const url = `${this.apiUrl}${endpoint}`;
    const body = { id };
    return promisePut({
      url,
      body,
      headers,
    }, this.rest);
  }

  public putDeviceRainDelay (
    id: Types.RequestInterface['putDeviceRainDelay']['id'],
  ) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const endpoint = `/device/rain_delay`;
    const url = `${this.apiUrl}${endpoint}`;
    const body = { id };
    return promisePut({
      url,
      body,
      headers,
    }, this.rest);
  }

  public putDeviceOn (
    id: Types.RequestInterface['putDeviceOn']['id'],
  ) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const endpoint = `/device/on`;
    const url = `${this.apiUrl}${endpoint}`;
    const body = { id };
    return promisePut({
      url,
      body,
      headers,
    }, this.rest);
  }

  public putDeviceOff (
    id: Types.RequestInterface['putDeviceOff']['id'],
  ) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const endpoint = `/device/off`;
    const url = `${this.apiUrl}${endpoint}`;
    const body = { id };
    return promisePut({
      url,
      body,
      headers,
    }, this.rest);
  }

  public putDevicePauseZoneRun (
    id: Types.RequestInterface['putDevicePauseZoneRun']['id'],
  ) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const endpoint = `/device/pause_zone_run`;
    const url = `${this.apiUrl}${endpoint}`;
    const body = { id };
    return promisePut({
      url,
      body,
      headers,
    }, this.rest);
  }

  public putDeviceResumeZoneRun (
    id: Types.RequestInterface['putDeviceResumeZoneRun']['id'],
  ) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const endpoint = `/device/resume_zone_run`;
    const url = `${this.apiUrl}${endpoint}`;
    const body = { id };
    return promisePut({
      url,
      body,
      headers,
    }, this.rest);
  }

  public getZone (
    id: Types.RequestInterface['getZone']['id'],
  ) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const endpoint = `/zone/${id}`;
    const url = `${this.apiUrl}${endpoint}`;
    return promiseGet({
      url,
      headers,
    }, this.rest);
  }

  public putZoneStart (
    id: Types.RequestInterface['putZoneStart']['id'],
  ) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const endpoint = `/zone/start`;
    const url = `${this.apiUrl}${endpoint}`;
    const body = { id };
    return promisePut({
      url,
      body,
      headers,
    }, this.rest);
  }
};

export default RachioService;
