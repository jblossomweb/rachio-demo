import {
  promiseGet,
} from 'core/rest/utils';

import * as Types from './LegacyService.types';

class LegacyService implements Types.ServiceInterface {
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

  public getLocations (
  ) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const endpoint = `/location/listLocations/true`;
    const url = `${this.apiUrl}${endpoint}`;
    return promiseGet({
      url,
      headers,
    }, this.rest);
  }

  public getDeviceState (
    id: Types.RequestInterface['getDeviceState']['id'],
  ) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const endpoint = `/device/getDeviceState/${id}`;
    const url = `${this.apiUrl}${endpoint}`;
    return promiseGet({
      url,
      headers,
    }, this.rest);
  }

  public getDeviceZoneSummary (
    id: Types.RequestInterface['getDeviceZoneSummary']['id'],
  ) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const endpoint = `/device/listZones/${id}`;
    const url = `${this.apiUrl}${endpoint}`;
    return promiseGet({
      url,
      headers,
    }, this.rest);
  }

};

export default LegacyService;
