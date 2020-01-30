import * as restMocks from 'core/rest/mocks';

import LegacyService from './';
import {
  ServiceRestInterface as LegacyServiceRestInterface,
} from './types';

const mockRest: LegacyServiceRestInterface = {
  get: restMocks.mockRest().get,
};

const spies = {
  get: jest.spyOn(mockRest, 'get'),
}

  const mockService = new LegacyService(restMocks.mockUrl, restMocks.mockApiKey, mockRest);

describe('services/legacy', () => {

  describe('getLocations', () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${restMocks.mockApiKey}`,
    };
    const endpoint = `/location/listLocations/true`;
    beforeEach(async () => {
      await mockService.getLocations();
    });
    it(`makes a GET request`, () => {
      expect(spies.get).toHaveBeenCalled();
    });
    it(`makes a GET request to ${endpoint} with proper headers`, () => {
      expect(spies.get).toHaveBeenLastCalledWith(
        `${restMocks.mockUrl}${endpoint}`,
        { headers },
      );
    });
  });

  describe('getDeviceState', () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${restMocks.mockApiKey}`,
    };
    const mockDeviceId: string = 'asdfasdfasdfasdfasdfasdfasdf';
    const endpoint = `/device/getDeviceState/${mockDeviceId}`;
    beforeEach(async () => {
      await mockService.getDeviceState(mockDeviceId);
    });
    it(`makes a GET request`, () => {
      expect(spies.get).toHaveBeenCalled();
    });
    it(`makes a GET request to ${endpoint} with proper headers`, () => {
      expect(spies.get).toHaveBeenLastCalledWith(
        `${restMocks.mockUrl}${endpoint}`,
        { headers },
      );
    });
  });
});
