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
  getId: jest.spyOn(actionThunks, 'getId'),
  getPerson: jest.spyOn(actionThunks, 'getPerson'),
};

describe('store/person/action/creators', () => {

  describe('getId', () => {
    const action: actionTypes.Interface['PERSON_GET_ID'] =
      actionCreators.getId(mockRachioService)(mockDispatch)
    ;
    const expectedAction: actionTypes.Interface['PERSON_GET_ID'] = {
      type: actionTypes.PERSON_GET_ID,
    };

    it(`should call getChirps thunk`, () => {
      expect(spies.getId).toHaveBeenCalled();
    });
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    });
  });

  describe('getIdSuccess', () => {
    const response: RachioServiceTypes.ResponseInterface['getSelfIdSuccess'] = { id: mockPerson.id };
    const action: actionTypes.Interface['PERSON_GET_ID_SUCCESS'] = actionCreators.getIdSuccess(response);
    const expectedAction: actionTypes.Interface['PERSON_GET_ID_SUCCESS'] = {
      type: actionTypes.PERSON_GET_ID_SUCCESS,
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

  describe('getIdError', () => {
    const response: RachioServiceTypes.ResponseErrors = { errors: [{ message: 'uh oh' }]};
    const action: actionTypes.Interface['PERSON_GET_ID_ERROR'] = actionCreators.getIdError(
      response,
    );
    const expectedAction: actionTypes.Interface['PERSON_GET_ID_ERROR'] = {
      type: actionTypes.PERSON_GET_ID_ERROR,
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

  describe('getPerson', () => {
    const action: actionTypes.Interface['PERSON_GET_PERSON'] =
      actionCreators.getPerson(mockPerson.id, mockRachioService)(mockDispatch)
    ;
    const expectedAction: actionTypes.Interface['PERSON_GET_PERSON'] = {
      type: actionTypes.PERSON_GET_PERSON,
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
    const action: actionTypes.Interface['PERSON_GET_PERSON_SUCCESS'] = actionCreators.getPersonSuccess(response);
    const expectedAction: actionTypes.Interface['PERSON_GET_PERSON_SUCCESS'] = {
      type: actionTypes.PERSON_GET_PERSON_SUCCESS,
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

  describe('getPersonError', () => {
    const response: RachioServiceTypes.ResponseErrors = { errors: [{ message: 'uh oh' }]};
    const action: actionTypes.Interface['PERSON_GET_PERSON_ERROR'] = actionCreators.getPersonError(
      response,
    );
    const expectedAction: actionTypes.Interface['PERSON_GET_PERSON_ERROR'] = {
      type: actionTypes.PERSON_GET_PERSON_ERROR,
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
