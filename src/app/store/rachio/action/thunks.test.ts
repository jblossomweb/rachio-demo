import Window from 'window-or-global';
import mockDispatch from 'core/mocks/dispatch';
import * as restMocks from 'core/rest/mocks';

import RachioService, { Types as Rachio } from 'app/services/rachio';
import LegacyService, { Types as Legacy } from 'app/services/legacy';

import mockPerson from 'app/__mocks__/person.json';
import mockDevice from 'app/__mocks__/device.json';
import mockZone from 'app/__mocks__/zone.json';
import mockDeviceState from 'app/__mocks__/deviceState.json';
import mockZoneSummary from 'app/__mocks__/zoneSummary.json';

import * as actionCreators from './creators';
import * as actionThunks from './thunks';

const mockRest: Rachio.ServiceRestInterface = {
  get: restMocks.mockRest().get,
  put: restMocks.mockRest().put,
};

const mockRestError: Rachio.ServiceRestInterface = {
  get: restMocks.mockRestError().get,
  put: restMocks.mockRestError().put,
};

const mockService = new RachioService(
  restMocks.mockUrl,
  restMocks.mockApiKey,
  mockRest,
);
const mockServiceError = new RachioService(
  restMocks.mockUrl,
  restMocks.mockApiKey,
  mockRestError,
);
const mockLegacyService = new LegacyService(
  restMocks.mockUrl,
  restMocks.mockApiKey,
  mockRest,
);
const mockLegacyServiceError = new LegacyService(
  restMocks.mockUrl,
  restMocks.mockApiKey,
  mockRestError,
);

Window.console = {
  error: jest.fn(),
};

const getSpies = (
  service: RachioService,
) => ({
  getSelfId: jest.spyOn(service, 'getSelfId'),
  getPerson: jest.spyOn(service, 'getPerson'),
  putDeviceOn: jest.spyOn(service, 'putDeviceOn'),
  putDeviceOff: jest.spyOn(service, 'putDeviceOff'),
  putZoneStart: jest.spyOn(service, 'putZoneStart'),
  putZoneStartMultiple: jest.spyOn(service, 'putZoneStartMultiple'),
});

const getLegacySpies = (
  service: LegacyService,
) => ({
  getDeviceState: jest.spyOn(service, 'getDeviceState'),
  getDeviceZoneSummary: jest.spyOn(service, 'getDeviceZoneSummary'),
});

const spies = {
  success: getSpies(mockService),
  fail: getSpies(mockServiceError),
};

const legacySpies = {
  success: getLegacySpies(mockLegacyService),
  fail: getLegacySpies(mockLegacyServiceError),
};

describe('store/rachio/action/thunks', () => {

  describe('getSelfId', () => {
    const response = { id: mockPerson.id };
    const error = { errors: [{ message: 'uh oh'}]};
    const success: Promise<any> = actionThunks.getSelfId(
      mockService,
    )(mockDispatch);
    const fail: Promise<any> = actionThunks.getSelfId(
      mockServiceError,
    )(mockDispatch);

    it(`always calls service.getSelfId`, async() => {
      await success;
      expect(spies.success.getSelfId).toHaveBeenCalled();
      await fail;
      expect(spies.fail.getSelfId).toHaveBeenCalled();
    });

    it(`dispatches getSelfIdSuccess action upon success`, async() => {
      const dispatchedAction = await success;
      expect(dispatchedAction).toEqual(
        mockDispatch(actionCreators.getSelfIdSuccess(response))
      );
    });

    it(`dispatches apiError action upon fail`, async() => {
      const dispatchedAction = await fail;
      expect(dispatchedAction).toEqual(
        mockDispatch(actionCreators.apiError(error))
      );
    });
  });

  describe('getPerson', () => {
    const response = mockPerson as Rachio.ResponseInterface['getPersonSuccess'];
    const error = { errors: [{ message: 'uh oh'}]};
    const success: Promise<any> = actionThunks.getPerson(
      mockPerson.id,
      mockService,
    )(mockDispatch);
    const fail: Promise<any> = actionThunks.getPerson(
      mockPerson.id,
      mockServiceError,
    )(mockDispatch);

    it(`always calls service.getPerson`, async() => {
      await success;
      expect(spies.success.getPerson).toHaveBeenCalled();
      await fail;
      expect(spies.fail.getPerson).toHaveBeenCalled();
    });

    it(`dispatches getPersonSuccess action upon success`, async() => {
      const dispatchedAction = await success;
      expect(dispatchedAction).toEqual(
        mockDispatch(actionCreators.getPersonSuccess(response))
      );
    });

    it(`dispatches apiError action upon fail`, async() => {
      const dispatchedAction = await fail;
      expect(dispatchedAction).toEqual(
        mockDispatch(actionCreators.apiError(error))
      );
    });
  });

  describe('getDeviceState', () => {
    const response = mockDeviceState as Legacy.ResponseInterface['getDeviceStateSuccess'];
    const error = { message: 'uh oh'};
    const success: Promise<any> = actionThunks.getDeviceState(
      mockDevice.id,
      mockLegacyService,
    )(mockDispatch);
    const fail: Promise<any> = actionThunks.getDeviceState(
      mockDevice.id,
      mockLegacyServiceError,
    )(mockDispatch);

    it(`always calls service.getDeviceState`, async() => {
      await success;
      expect(legacySpies.success.getDeviceState).toHaveBeenCalled();
      await fail;
      expect(legacySpies.fail.getDeviceState).toHaveBeenCalled();
    });

    it(`dispatches getDeviceStateSuccess action upon success`, async() => {
      const dispatchedAction = await success;
      expect(dispatchedAction).toEqual(
        mockDispatch(actionCreators.getDeviceStateSuccess(response))
      );
    });

    it(`dispatches legacyApiError action upon fail`, async() => {
      const dispatchedAction = await fail;
      expect(dispatchedAction).toEqual(
        mockDispatch(actionCreators.legacyApiError(error))
      );
    });
  });

  describe('getDeviceZoneSummary', () => {
    const response = mockZoneSummary as Legacy.ResponseInterface['getDeviceZoneSummarySuccess'];
    const error = { message: 'uh oh'};
    const success: Promise<any> = actionThunks.getDeviceZoneSummary(
      mockDevice.id,
      mockLegacyService,
    )(mockDispatch);
    const fail: Promise<any> = actionThunks.getDeviceZoneSummary(
      mockDevice.id,
      mockLegacyServiceError,
    )(mockDispatch);

    it(`always calls service.getDeviceZoneSummary`, async() => {
      await success;
      expect(legacySpies.success.getDeviceZoneSummary).toHaveBeenCalled();
      await fail;
      expect(legacySpies.fail.getDeviceZoneSummary).toHaveBeenCalled();
    });

    it(`dispatches getDeviceZoneSummarySuccess action upon success`, async() => {
      const dispatchedAction = await success;
      expect(dispatchedAction).toEqual(
        mockDispatch(actionCreators.getDeviceZoneSummarySuccess(response))
      );
    });

    it(`dispatches legacyApiError action upon fail`, async() => {
      const dispatchedAction = await fail;
      expect(dispatchedAction).toEqual(
        mockDispatch(actionCreators.legacyApiError(error))
      );
    });
  });

  describe('putDeviceOn', () => {
    const { id } = mockDevice;
    const error = { errors: [{ message: 'uh oh'}]};
    const success: Promise<any> = actionThunks.putDeviceOn(
      id,
      mockService,
    )(mockDispatch);
    const fail: Promise<any> = actionThunks.putDeviceOn(
      id,
      mockServiceError,
    )(mockDispatch);

    it(`always calls service.putDeviceOn`, async() => {
      await success;
      expect(spies.success.putDeviceOn).toHaveBeenCalled();
      await fail;
      expect(spies.fail.putDeviceOn).toHaveBeenCalled();
    });

    it(`dispatches putDeviceOnSuccess action upon success`, async() => {
      const dispatchedAction = await success;
      expect(dispatchedAction).toEqual(
        mockDispatch(actionCreators.putDeviceOnSuccess(id))
      );
    });

    it(`dispatches apiError action upon fail`, async() => {
      const dispatchedAction = await fail;
      expect(dispatchedAction).toEqual(
        mockDispatch(actionCreators.apiError(error))
      );
    });
  });

  describe('putDeviceOff', () => {
    const { id } = mockDevice;
    const error = { errors: [{ message: 'uh oh'}]};
    const success: Promise<any> = actionThunks.putDeviceOff(
      id,
      mockService,
    )(mockDispatch);
    const fail: Promise<any> = actionThunks.putDeviceOff(
      id,
      mockServiceError,
    )(mockDispatch);

    it(`always calls service.putDeviceOff`, async() => {
      await success;
      expect(spies.success.putDeviceOff).toHaveBeenCalled();
      await fail;
      expect(spies.fail.putDeviceOff).toHaveBeenCalled();
    });

    it(`dispatches putDeviceOffSuccess action upon success`, async() => {
      const dispatchedAction = await success;
      expect(dispatchedAction).toEqual(
        mockDispatch(actionCreators.putDeviceOffSuccess(id))
      );
    });

    it(`dispatches apiError action upon fail`, async() => {
      const dispatchedAction = await fail;
      expect(dispatchedAction).toEqual(
        mockDispatch(actionCreators.apiError(error))
      );
    });
  });

  describe('putZoneStart', () => {
    const { id } = mockZone;
    const seconds: number = 30;
    const error = { errors: [{ message: 'uh oh'}]};
    const success: Promise<any> = actionThunks.putZoneStart(
      id,
      seconds,
      mockService,
    )(mockDispatch);
    const fail: Promise<any> = actionThunks.putZoneStart(
      id,
      seconds,
      mockServiceError,
    )(mockDispatch);

    it(`always calls service.putZoneStart`, async() => {
      await success;
      expect(spies.success.putZoneStart).toHaveBeenCalled();
      await fail;
      expect(spies.fail.putZoneStart).toHaveBeenCalled();
    });

    it(`dispatches putZoneStartSuccess action upon success`, async() => {
      const dispatchedAction = await success;
      expect(dispatchedAction).toEqual(
        mockDispatch(actionCreators.putZoneStartSuccess(id, seconds))
      );
    });

    it(`dispatches apiError action upon fail`, async() => {
      const dispatchedAction = await fail;
      expect(dispatchedAction).toEqual(
        mockDispatch(actionCreators.apiError(error))
      );
    });
  });

  describe('putZoneStartMultiple', () => {
    const seconds: number = 30;
    const zones: Rachio.RequestInterface['putZoneStartMultiple']['zones'] = [
      { id: 'foo', duration: seconds, sortOrder: 1 },
      { id: 'bar', duration: seconds, sortOrder: 2 },
      { id: 'buzz', duration: seconds, sortOrder: 3 },
      { id: 'bazz', duration: seconds, sortOrder: 4 },
      { id: 'rutabega', duration: seconds, sortOrder: 5 },
    ];
    const error = { errors: [{ message: 'uh oh'}]};
    const success: Promise<any> = actionThunks.putZoneStartMultiple(
      zones,
      mockService,
    )(mockDispatch);
    const fail: Promise<any> = actionThunks.putZoneStartMultiple(
      zones,
      mockServiceError,
    )(mockDispatch);

    it(`always calls service.putZoneStartMultiple`, async() => {
      await success;
      expect(spies.success.putZoneStartMultiple).toHaveBeenCalled();
      await fail;
      expect(spies.fail.putZoneStartMultiple).toHaveBeenCalled();
    });

    it(`dispatches putZoneStartMultipleSuccess action upon success`, async() => {
      const dispatchedAction = await success;
      expect(dispatchedAction).toEqual(
        mockDispatch(actionCreators.putZoneStartMultipleSuccess(zones))
      );
    });

    it(`dispatches apiError action upon fail`, async() => {
      const dispatchedAction = await fail;
      expect(dispatchedAction).toEqual(
        mockDispatch(actionCreators.apiError(error))
      );
    });
  });

});
