import Window from 'window-or-global';
import mockDispatch from 'core/mocks/dispatch';
import * as restMocks from 'core/rest/mocks';

import RachioService from 'app/services/rachio';
import * as RachioServiceTypes from 'app/services/rachio/types';

import mockPerson from 'app/__mocks__/person.json';

import * as actionCreators from './creators';
import * as actionThunks from './thunks';

const mockRest: RachioServiceTypes.ServiceRestInterface = {
  get: restMocks.mockRest().get,
  put: restMocks.mockRest().put,
};

const mockRestError: RachioServiceTypes.ServiceRestInterface = {
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

Window.console = {
  error: jest.fn(),
};

const getSpies = (
  service: RachioService,
) => ({
  getSelfId: jest.spyOn(service, 'getSelfId'),
  getPerson: jest.spyOn(service, 'getPerson'),
})

const spies = {
  success: getSpies(mockService),
  fail: getSpies(mockServiceError),
}

describe('store/person/action/thunks', () => {

  describe('getId', () => {
    const response = { id: mockPerson.id };
    const error = { errors: [{ message: 'uh oh'}]};
    const success: Promise<any> = actionThunks.getId(
      mockService,
    )(mockDispatch);
    const fail: Promise<any> = actionThunks.getId(
      mockServiceError,
    )(mockDispatch);

    it(`always calls service.getSelfId`, async() => {
      await success;
      expect(spies.success.getSelfId).toHaveBeenCalled();
      await fail;
      expect(spies.fail.getSelfId).toHaveBeenCalled();
    });

    it(`dispatches getIdSuccess action upon success`, async() => {
      const dispatchedAction = await success;
      expect(dispatchedAction).toEqual(
        mockDispatch(actionCreators.getIdSuccess(response))
      );
    });

    it(`dispatches getIdError action upon fail`, async() => {
      const dispatchedAction = await fail;
      expect(dispatchedAction).toEqual(
        mockDispatch(actionCreators.getIdError(error))
      );
    });
  });

  describe('getPerson', () => {
    const response = mockPerson as RachioServiceTypes.ResponseInterface['getPersonSuccess'];
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

    it(`dispatches getPersonError action upon fail`, async() => {
      const dispatchedAction = await fail;
      expect(dispatchedAction).toEqual(
        mockDispatch(actionCreators.getPersonError(error))
      );
    });
  });
});
