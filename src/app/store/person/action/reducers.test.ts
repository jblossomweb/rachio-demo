import { fromJS } from 'immutable';
import { AppReducer, getInitialState } from 'core/store';

import mockPerson from 'app/__mocks__/person.json';

import * as actionTypes from './types';
import actionReducers from './reducers';
import paths from '../paths';

const mockErrors = { errors: [{ message: 'uh-oh'}] }

describe('store/person/action/reducers', () => {

  describe('PERSON_GET_ID', () => {
    const action: actionTypes.Interface['PERSON_GET_ID'] = {
      type: 'PERSON_GET_ID',
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set thinking to true', () => {
      const path = paths.thinking();
      const state = getInitialState().setIn(path, undefined);
      expect(state.getIn(path)).toEqual(undefined);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(true);
    });
  });

  describe('PERSON_GET_ID_SUCCESS', () => {
    const response = { id: mockPerson.id };
    const action: actionTypes.Interface['PERSON_GET_ID_SUCCESS'] = {
      type: 'PERSON_GET_ID_SUCCESS',
      payload: {
        response,
      },
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set thinking to false', () => {
      const path = paths.thinking();
      const state = getInitialState().setIn(path, true);
      expect(state.getIn(path)).toEqual(true);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(false);
    });

    it('should set errors to null', () => {
      const path = paths.errors();
      const state = getInitialState().setIn(path, mockErrors);
      expect(state.getIn(path)).toEqual(mockErrors);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).not.toEqual(mockErrors);
      expect(newState.getIn(path)).toEqual(null);
    });

    it('should set id to payload.response.id', () => {
      const path = paths.id();
      const state = getInitialState().setIn(path, undefined);
      expect(state.getIn(path)).toEqual(undefined);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(response.id);
    });
  });

  describe('PERSON_GET_ID_ERROR', () => {
    const response = mockErrors;
    const action: actionTypes.Interface['PERSON_GET_ID_ERROR'] = {
      type: 'PERSON_GET_ID_ERROR',
      payload: {
        response,
      },
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set thinking to false', () => {
      const path = paths.thinking();
      const state = getInitialState().setIn(path, true);
      expect(state.getIn(path)).toEqual(true);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(false);
    });

    it('should set errors to payload', () => {
      const path = paths.errors();
      const state = getInitialState().setIn(path, undefined);
      expect(state.getIn(path)).toEqual(undefined);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).not.toEqual(undefined);
      expect(newState.getIn(path)).not.toEqual(null);
      expect(newState.getIn(path)).toEqual(fromJS(action.payload.response.errors));
    });
  });

  describe('PERSON_GET_PERSON', () => {
    const action: actionTypes.Interface['PERSON_GET_PERSON'] = {
      type: 'PERSON_GET_PERSON',
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set thinking to true', () => {
      const path = paths.thinking();
      const state = getInitialState().setIn(path, undefined);
      expect(state.getIn(path)).toEqual(undefined);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(true);
    });
  });

});
