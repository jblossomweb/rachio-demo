import mockDispatch from 'core/mocks/dispatch';
import * as restMocks from 'core/rest/mocks';

import mockPerson from 'app/__mocks__/person.json';

import RachioService from 'app/services/rachio';
import * as RachioServiceTypes from 'app/services/rachio/types';

import * as actionTypes from './types';
import * as actionCreators from './creators';
import * as actionThunks from './thunks';

const mockRest: RachioServiceTypes.ServiceRestInterface = {
  get: restMocks.mockRest().get,
  put: restMocks.mockRest().put,
};

const mockRachioService: RachioServiceTypes.ServiceInterface =
  new RachioService(
    restMocks.mockUrl,
    restMocks.mockApiKey,
    mockRest,
  )
;

const spies = {
  getSelfId: jest.spyOn(actionThunks, 'getSelfId'),
  getPerson: jest.spyOn(actionThunks, 'getPerson'),
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
    const response: RachioServiceTypes.ResponseInterface['getSelfIdSuccess'] = { id: mockPerson.id };
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
    const response = mockPerson as RachioServiceTypes.ResponseInterface['getPersonSuccess'];
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

  describe('apiError', () => {
    const response: RachioServiceTypes.ResponseErrors = { errors: [{ message: 'uh oh' }]};
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

});
