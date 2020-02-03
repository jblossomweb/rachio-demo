import mockDispatch from 'core/mocks/dispatch';
import * as restMocks from 'core/rest/mocks';

import mockPerson from 'app/__mocks__/person.json';
import mockDevice from 'app/__mocks__/device.json';
import mockZone from 'app/__mocks__/zone.json';
import mockDeviceState from 'app/__mocks__/deviceState.json';
import mockZoneSummary from 'app/__mocks__/zoneSummary.json';

import RachioService, { Types as Rachio } from 'app/services/rachio';
import LegacyService, { Types as Legacy } from 'app/services/legacy';

import * as actionTypes from './types';
import * as actionCreators from './creators';
import * as actionThunks from './thunks';

const mockRest: Rachio.ServiceRestInterface = {
  get: restMocks.mockRest().get,
  put: restMocks.mockRest().put,
};

const mockRachioService: Rachio.ServiceInterface =
  new RachioService(
    restMocks.mockUrl,
    restMocks.mockApiKey,
    mockRest,
  )
;

const mockLegacyService: Legacy.ServiceInterface =
  new LegacyService(
    restMocks.mockUrl,
    restMocks.mockApiKey,
    mockRest,
  )
;

const spies = {
  getSelfId: jest.spyOn(actionThunks, 'getSelfId'),
  getPerson: jest.spyOn(actionThunks, 'getPerson'),
  putDeviceOn: jest.spyOn(actionThunks, 'putDeviceOn'),
  putDeviceOff: jest.spyOn(actionThunks, 'putDeviceOff'),
  getDeviceState: jest.spyOn(actionThunks, 'getDeviceState'),
  getDeviceZoneSummary: jest.spyOn(actionThunks, 'getDeviceZoneSummary'),
  putZoneStart: jest.spyOn(actionThunks, 'putZoneStart'),
  putZoneStartMultiple: jest.spyOn(actionThunks, 'putZoneStartMultiple'),
};

describe('store/rachio/action/creators', () => {

  describe('getSelfId', () => {
    const action: actionTypes.Interface['RACHIO_GET_SELF_ID'] =
      actionCreators.getSelfId(mockRachioService)(mockDispatch)
    ;
    const expectedAction: actionTypes.Interface['RACHIO_GET_SELF_ID'] = {
      type: actionTypes.RACHIO_GET_SELF_ID,
    };

    it(`should call getSelfId thunk`, () => {
      expect(spies.getSelfId).toHaveBeenCalled();
    });
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    });
  });

  describe('getSelfIdSuccess', () => {
    const response: Rachio.ResponseInterface['getSelfIdSuccess'] = { id: mockPerson.id };
    const action: actionTypes.Interface['RACHIO_GET_SELF_ID_SUCCESS'] = actionCreators.getSelfIdSuccess(response);
    const expectedAction: actionTypes.Interface['RACHIO_GET_SELF_ID_SUCCESS'] = {
      type: actionTypes.RACHIO_GET_SELF_ID_SUCCESS,
      payload: {
        response,
      }
    };
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type);
    });
    it(`should return response with 'id' in action payload`, () => {
      expect(action.payload.response.id).toEqual(expectedAction.payload.response.id);
    });
  });

  describe('getPerson', () => {
    const action: actionTypes.Interface['RACHIO_GET_PERSON'] =
      actionCreators.getPerson(mockPerson.id, mockRachioService)(mockDispatch)
    ;
    const expectedAction: actionTypes.Interface['RACHIO_GET_PERSON'] = {
      type: actionTypes.RACHIO_GET_PERSON,
    };

    it(`should call getPerson thunk`, () => {
      expect(spies.getPerson).toHaveBeenCalled();
    });
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    });
  });

  describe('getPersonSuccess', () => {
    const response = mockPerson as Rachio.ResponseInterface['getPersonSuccess'];
    const action: actionTypes.Interface['RACHIO_GET_PERSON_SUCCESS'] = actionCreators.getPersonSuccess(response);
    const expectedAction: actionTypes.Interface['RACHIO_GET_PERSON_SUCCESS'] = {
      type: actionTypes.RACHIO_GET_PERSON_SUCCESS,
      payload: {
        response,
      }
    };
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type);
    });
    it(`should return response with 'id' in action payload`, () => {
      expect(action.payload.response.id).toEqual(expectedAction.payload.response.id);
    });
  });

  describe('putDeviceOn', () => {
    const action: actionTypes.Interface['RACHIO_PUT_DEVICE_ON'] =
      actionCreators.putDeviceOn(mockDevice.id, mockRachioService)(mockDispatch)
    ;
    const expectedAction: actionTypes.Interface['RACHIO_PUT_DEVICE_ON'] = {
      type: actionTypes.RACHIO_PUT_DEVICE_ON,
      payload: {
        id: mockDevice.id,
      }
    };

    it(`should call putDeviceOn thunk`, () => {
      expect(spies.putDeviceOn).toHaveBeenCalled();
    });
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    });
  });

  describe('putDeviceOnSuccess', () => {
    const action: actionTypes.Interface['RACHIO_PUT_DEVICE_ON_SUCCESS'] =
      actionCreators.putDeviceOnSuccess(mockDevice.id);
    const expectedAction: actionTypes.Interface['RACHIO_PUT_DEVICE_ON_SUCCESS'] = {
      type: actionTypes.RACHIO_PUT_DEVICE_ON_SUCCESS,
      payload: {
        id: mockDevice.id,
      }
    };
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type);
    });
    it(`should return id in action payload`, () => {
      expect(action.payload.id).toEqual(expectedAction.payload.id);
    });
  });

  describe('putDeviceOff', () => {
    const action: actionTypes.Interface['RACHIO_PUT_DEVICE_OFF'] =
      actionCreators.putDeviceOff(mockDevice.id, mockRachioService)(mockDispatch)
    ;
    const expectedAction: actionTypes.Interface['RACHIO_PUT_DEVICE_OFF'] = {
      type: actionTypes.RACHIO_PUT_DEVICE_OFF,
      payload: {
        id: mockDevice.id,
      }
    };

    it(`should call putDeviceOff thunk`, () => {
      expect(spies.putDeviceOff).toHaveBeenCalled();
    });
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    });
  });

  describe('putDeviceOffSuccess', () => {
    const action: actionTypes.Interface['RACHIO_PUT_DEVICE_OFF_SUCCESS'] =
      actionCreators.putDeviceOffSuccess(mockDevice.id);
    const expectedAction: actionTypes.Interface['RACHIO_PUT_DEVICE_OFF_SUCCESS'] = {
      type: actionTypes.RACHIO_PUT_DEVICE_OFF_SUCCESS,
      payload: {
        id: mockDevice.id,
      }
    };
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type);
    });
    it(`should return id in action payload`, () => {
      expect(action.payload.id).toEqual(expectedAction.payload.id);
    });
  });

  describe('getDeviceState', () => {
    const action: actionTypes.Interface['RACHIO_GET_DEVICE_STATE'] =
      actionCreators.getDeviceState(mockDevice.id, mockLegacyService)(mockDispatch)
    ;
    const expectedAction: actionTypes.Interface['RACHIO_GET_DEVICE_STATE'] = {
      type: actionTypes.RACHIO_GET_DEVICE_STATE,
      payload: {
        id: mockDevice.id,
      }
    };

    it(`should call getDeviceState thunk`, () => {
      expect(spies.getDeviceState).toHaveBeenCalled();
    });
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    });
  });

  describe('getDeviceStateSuccess', () => {
    const mockResponse = mockDeviceState as Legacy.ResponseInterface['getDeviceStateSuccess'];
    const action: actionTypes.Interface['RACHIO_GET_DEVICE_STATE_SUCCESS'] =
      actionCreators.getDeviceStateSuccess(mockResponse);
    const expectedAction: actionTypes.Interface['RACHIO_GET_DEVICE_STATE_SUCCESS'] = {
      type: actionTypes.RACHIO_GET_DEVICE_STATE_SUCCESS,
      payload: {
        response: mockResponse,
      }
    };
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type);
    });
    it(`should return response in action payload`, () => {
      expect(action.payload.response).toEqual(expectedAction.payload.response);
    });
  });

  describe('getDeviceZoneSummary', () => {
    const action: actionTypes.Interface['RACHIO_GET_DEVICE_ZONE_SUMMARY'] =
      actionCreators.getDeviceZoneSummary(mockDevice.id, mockLegacyService)(mockDispatch)
    ;
    const expectedAction: actionTypes.Interface['RACHIO_GET_DEVICE_ZONE_SUMMARY'] = {
      type: actionTypes.RACHIO_GET_DEVICE_ZONE_SUMMARY,
      payload: {
        id: mockDevice.id,
      }
    };

    it(`should call getDeviceZoneSummary thunk`, () => {
      expect(spies.getDeviceZoneSummary).toHaveBeenCalled();
    });
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    });
  });

  describe('getDeviceZoneSummarySuccess', () => {
    const mockResponse = mockZoneSummary as Legacy.ResponseInterface['getDeviceZoneSummarySuccess'];
    const action: actionTypes.Interface['RACHIO_GET_DEVICE_ZONE_SUMMARY_SUCCESS'] =
      actionCreators.getDeviceZoneSummarySuccess(mockResponse);
    const expectedAction: actionTypes.Interface['RACHIO_GET_DEVICE_ZONE_SUMMARY_SUCCESS'] = {
      type: actionTypes.RACHIO_GET_DEVICE_ZONE_SUMMARY_SUCCESS,
      payload: {
        response: mockResponse,
      }
    };
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type);
    });
    it(`should return response in action payload`, () => {
      expect(action.payload.response).toEqual(expectedAction.payload.response);
    });
  });

  describe('putZoneStart', () => {
    const seconds: number = 30;
    const action: actionTypes.Interface['RACHIO_PUT_ZONE_START'] =
      actionCreators.putZoneStart(
        mockZone.id,
        seconds,
        mockRachioService,
      )(mockDispatch)
    ;
    const expectedAction: actionTypes.Interface['RACHIO_PUT_ZONE_START'] = {
      type: actionTypes.RACHIO_PUT_ZONE_START,
      payload: {
        id: mockZone.id,
        seconds,
      }
    };

    it(`should call putZoneStart thunk`, () => {
      expect(spies.putZoneStart).toHaveBeenCalled();
    });
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    });
  });

  describe('putZoneStartSuccess', () => {
    const seconds: number = 30;
    const action: actionTypes.Interface['RACHIO_PUT_ZONE_START_SUCCESS'] =
      actionCreators.putZoneStartSuccess(mockDevice.id, seconds);
    const expectedAction: actionTypes.Interface['RACHIO_PUT_ZONE_START_SUCCESS'] = {
      type: actionTypes.RACHIO_PUT_ZONE_START_SUCCESS,
      payload: {
        id: mockDevice.id,
        seconds,
      }
    };
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type);
    });
    it(`should return id in action payload`, () => {
      expect(action.payload.id).toEqual(expectedAction.payload.id);
    });
    it(`should return seconds in action payload`, () => {
      expect(action.payload.seconds).toEqual(expectedAction.payload.seconds);
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
    const action: actionTypes.Interface['RACHIO_PUT_ZONE_START_MULTIPLE'] =
      actionCreators.putZoneStartMultiple(
        zones,
        mockRachioService,
      )(mockDispatch)
    ;
    const expectedAction: actionTypes.Interface['RACHIO_PUT_ZONE_START_MULTIPLE'] = {
      type: actionTypes.RACHIO_PUT_ZONE_START_MULTIPLE,
      payload: {
        zones,
      }
    };

    it(`should call putZoneStartMultiple thunk`, () => {
      expect(spies.putZoneStartMultiple).toHaveBeenCalled();
    });
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    });
  });

  describe('putZoneStartMultipleSuccess', () => {
    const seconds: number = 30;
    const zones: Rachio.RequestInterface['putZoneStartMultiple']['zones'] = [
      { id: 'foo', duration: seconds, sortOrder: 1 },
      { id: 'bar', duration: seconds, sortOrder: 2 },
      { id: 'buzz', duration: seconds, sortOrder: 3 },
      { id: 'bazz', duration: seconds, sortOrder: 4 },
      { id: 'rutabega', duration: seconds, sortOrder: 5 },
    ];
    const action: actionTypes.Interface['RACHIO_PUT_ZONE_START_MULTIPLE_SUCCESS'] =
      actionCreators.putZoneStartMultipleSuccess(zones);
    const expectedAction: actionTypes.Interface['RACHIO_PUT_ZONE_START_MULTIPLE_SUCCESS'] = {
      type: actionTypes.RACHIO_PUT_ZONE_START_MULTIPLE_SUCCESS,
      payload: {
        zones,
      }
    };
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type);
    });
    it(`should return zones in action payload`, () => {
      expect(action.payload.zones).toEqual(expectedAction.payload.zones);
    });
  });

  describe('apiError', () => {
    const response: Rachio.ResponseErrors = { errors: [{ message: 'uh oh' }]};
    const action: actionTypes.Interface['RACHIO_API_ERROR'] = actionCreators.apiError(
      response,
    );
    const expectedAction: actionTypes.Interface['RACHIO_API_ERROR'] = {
      type: actionTypes.RACHIO_API_ERROR,
      payload: {
        response,
      }
    };
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type);
    });
    it(`should return expected errors in action payload`, () => {
      expect(
        action.payload.response.errors.length,
      ).toEqual(
        expectedAction.payload.response.errors.length,
      );
      expect(
        action.payload.response.errors[0].message,
      ).toEqual(
        expectedAction.payload.response.errors[0].message,
      );
    });
  });

  describe('legacyApiError', () => {
    const response: Legacy.ResponseInterface['error'] = { message: 'uh oh' };
    const action: actionTypes.Interface['RACHIO_LEGACY_API_ERROR'] = actionCreators.legacyApiError(
      response,
    );
    const expectedAction: actionTypes.Interface['RACHIO_LEGACY_API_ERROR'] = {
      type: actionTypes.RACHIO_LEGACY_API_ERROR,
      payload: {
        response,
      }
    };
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type);
    });
    it(`should return response in action payload`, () => {
      expect(
        action.payload.response,
      ).toEqual(
        expectedAction.payload.response,
      );
    });
  });

  describe('dismissError', () => {
    const key: number = 7;
    const action: actionTypes.Interface['RACHIO_DISMISS_ERROR'] =
      actionCreators.dismissError(key);
    const expectedAction: actionTypes.Interface['RACHIO_DISMISS_ERROR'] = {
      type: actionTypes.RACHIO_DISMISS_ERROR,
      payload: {
        key,
      }
    };
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type);
    });
    it(`should return key in action payload`, () => {
      expect(action.payload.key).toEqual(expectedAction.payload.key);
    });
  });

  describe('clearData', () => {
    const action: actionTypes.Interface['RACHIO_CLEAR_DATA'] =
      actionCreators.clearData();
    const expectedAction: actionTypes.Interface['RACHIO_CLEAR_DATA'] = {
      type: actionTypes.RACHIO_CLEAR_DATA,
    };
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type);
    });
  });

});
