import * as restMocks from 'core/rest/mocks';

import RachioService from './';
import * as Rachio from './RachioService.types';

const mockRest: Rachio.ServiceRestInterface = {
  get: restMocks.mockRest().get,
  put: restMocks.mockRest().put,
};

const spies = {
  get: jest.spyOn(mockRest, 'get'),
  put: jest.spyOn(mockRest, 'put'),
}

const mockService = new RachioService(
  restMocks.mockUrl,
  restMocks.mockApiKey,
  mockRest,
);

const mockHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${restMocks.mockApiKey}`,
};

describe('services/rachio', () => {

  describe('getSelfId', () => {
    const headers = mockHeaders;
    const endpoint = `/person/info`;
    beforeEach(async () => {
      await mockService.getSelfId();
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

  describe('getPerson', () => {
    const mockId = 'abasdfc'; // TODO: mock a meaningful value
    const headers = mockHeaders;
    const endpoint = `/person/${mockId}`;
    beforeEach(async () => {
      await mockService.getPerson(
        mockId,
      );
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

  describe('getDevice', () => {
    const mockId = 'abasdfc'; // TODO: mock a meaningful value
    const headers = mockHeaders;
    const endpoint = `/device/${mockId}`;
    beforeEach(async () => {
      await mockService.getDevice(
        mockId,
      );
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

  describe('getDeviceSchedule', () => {
    const mockId = 'abasdfc'; // TODO: mock a meaningful value
    const headers = mockHeaders;
    const endpoint = `/device/${mockId}/current_schedule`;
    beforeEach(async () => {
      await mockService.getDeviceSchedule(
        mockId,
      );
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

  describe('getDeviceEvents', () => {
    const mockId = 'abasdfc'; // TODO: mock a meaningful value
    const mockStartTime = 123; // TODO: mock a meaningful value
    const mockEndTime = 123; // TODO: mock a meaningful value
    const headers = mockHeaders;
    const endpoint = `/device/${mockId}/event?startTime=${mockStartTime}&endTime=${mockEndTime}`;
    beforeEach(async () => {
      await mockService.getDeviceEvents(
        mockId,
        mockStartTime,
        mockEndTime,
      );
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

  describe('getDeviceForecast', () => {
    const mockId = 'abasdfc'; // TODO: mock a meaningful value
    const mockUnits = 'US';
    const headers = mockHeaders;
    const endpoint = `/device/${mockId}/forecast?units=${mockUnits}`;
    beforeEach(async () => {
      await mockService.getDeviceForecast(
        mockId,
        mockUnits,
      );
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

  describe('putDeviceStopWater', () => {
    const mockId = 'abasdfc'; // TODO: mock a meaningful value
    const headers = mockHeaders;
    const endpoint = `/device/stop_water`;
    const body = {
      id: mockId,
    };
    beforeEach(async () => {
      await mockService.putDeviceStopWater(
        mockId,
      );
    });
    it(`makes a PUT request`, () => {
      expect(spies.put).toHaveBeenCalled();
    });
    it(`makes a PUT request to ${endpoint} with proper body and headers`, () => {
      expect(spies.put).toHaveBeenLastCalledWith(
        `${restMocks.mockUrl}${endpoint}`,
        body,
        { headers },
      );
    });
  });

  describe('putDeviceRainDelay', () => {
    const mockId = 'abasdfc'; // TODO: mock a meaningful value
    const headers = mockHeaders;
    const endpoint = `/device/rain_delay`;
    const body = {
      id: mockId,
    };
    beforeEach(async () => {
      await mockService.putDeviceRainDelay(
        mockId,
      );
    });
    it(`makes a PUT request`, () => {
      expect(spies.put).toHaveBeenCalled();
    });
    it(`makes a PUT request to ${endpoint} with proper body and headers`, () => {
      expect(spies.put).toHaveBeenLastCalledWith(
        `${restMocks.mockUrl}${endpoint}`,
        body,
        { headers },
      );
    });
  });

  describe('putDeviceOn', () => {
    const mockId = 'abasdfc'; // TODO: mock a meaningful value
    const headers = mockHeaders;
    const endpoint = `/device/on`;
    const body = {
      id: mockId,
    };
    beforeEach(async () => {
      await mockService.putDeviceOn(
        mockId,
      );
    });
    it(`makes a PUT request`, () => {
      expect(spies.put).toHaveBeenCalled();
    });
    it(`makes a PUT request to ${endpoint} with proper body and headers`, () => {
      expect(spies.put).toHaveBeenLastCalledWith(
        `${restMocks.mockUrl}${endpoint}`,
        body,
        { headers },
      );
    });
  });

  describe('putDeviceOff', () => {
    const mockId = 'abasdfc'; // TODO: mock a meaningful value
    const headers = mockHeaders;
    const endpoint = `/device/off`;
    const body = {
      id: mockId,
    };
    beforeEach(async () => {
      await mockService.putDeviceOff(
        mockId,
      );
    });
    it(`makes a PUT request`, () => {
      expect(spies.put).toHaveBeenCalled();
    });
    it(`makes a PUT request to ${endpoint} with proper body and headers`, () => {
      expect(spies.put).toHaveBeenLastCalledWith(
        `${restMocks.mockUrl}${endpoint}`,
        body,
        { headers },
      );
    });
  });

  describe('putDevicePauseZoneRun', () => {
    const mockId = 'abasdfc'; // TODO: mock a meaningful value
    const headers = mockHeaders;
    const endpoint = `/device/pause_zone_run`;
    const body = {
      id: mockId,
    };
    beforeEach(async () => {
      await mockService.putDevicePauseZoneRun(
        mockId,
      );
    });
    it(`makes a PUT request`, () => {
      expect(spies.put).toHaveBeenCalled();
    });
    it(`makes a PUT request to ${endpoint} with proper body and headers`, () => {
      expect(spies.put).toHaveBeenLastCalledWith(
        `${restMocks.mockUrl}${endpoint}`,
        body,
        { headers },
      );
    });
  });

  describe('putDeviceResumeZoneRun', () => {
    const mockId = 'abasdfc'; // TODO: mock a meaningful value
    const headers = mockHeaders;
    const endpoint = `/device/resume_zone_run`;
    const body = {
      id: mockId,
    };
    beforeEach(async () => {
      await mockService.putDeviceResumeZoneRun(
        mockId,
      );
    });
    it(`makes a PUT request`, () => {
      expect(spies.put).toHaveBeenCalled();
    });
    it(`makes a PUT request to ${endpoint} with proper body and headers`, () => {
      expect(spies.put).toHaveBeenLastCalledWith(
        `${restMocks.mockUrl}${endpoint}`,
        body,
        { headers },
      );
    });
  });

  describe('getZone', () => {
    const mockId = 'abasdfc'; // TODO: mock a meaningful value
    const headers = mockHeaders;
    const endpoint = `/zone/${mockId}`;
    beforeEach(async () => {
      await mockService.getZone(
        mockId,
      );
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

  describe('putZoneStart', () => {
    const mockId = 'abasdfc'; // TODO: mock a meaningful value
    const headers = mockHeaders;
    const endpoint = `/zone/start`;
    const body = {
      id: mockId,
    };
    beforeEach(async () => {
      await mockService.putZoneStart(
        mockId,
      );
    });
    it(`makes a PUT request`, () => {
      expect(spies.put).toHaveBeenCalled();
    });
    it(`makes a PUT request to ${endpoint} with proper body and headers`, () => {
      expect(spies.put).toHaveBeenLastCalledWith(
        `${restMocks.mockUrl}${endpoint}`,
        body,
        { headers },
      );
    });
  });
});
