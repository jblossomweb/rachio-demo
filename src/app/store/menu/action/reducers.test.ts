import { AppReducer, getInitialState } from 'core/store';

import * as actionTypes from './types';
import actionReducers from './reducers';
import paths from '../paths';

describe('store/menu/action/reducers', () => {

  describe('MENU_EXPAND_MENU', () => {
    const action: actionTypes.Interface['MENU_EXPAND_MENU'] = {
      type: 'MENU_EXPAND_MENU',
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set collapsed to false', () => {
      const path = paths.collapsed();
      const state = getInitialState().setIn(path, true);
      expect(state.getIn(path)).toEqual(true);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(false);
    });
  });

  describe('MENU_COLLAPSE_MENU', () => {
    const action: actionTypes.Interface['MENU_COLLAPSE_MENU'] = {
      type: 'MENU_COLLAPSE_MENU',
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should set collapsed to true', () => {
      const path = paths.collapsed();
      const state = getInitialState().setIn(path, false);
      expect(state.getIn(path)).toEqual(false);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(true);
    });
  });

});
