import * as actionTypes from './types';
import * as actionCreators from './creators';

describe('store/menu/action/creators', () => {

  describe('expandMenu', () => {
    const action: actionTypes.Interface['MENU_EXPAND_MENU'] = actionCreators.expandMenu();
    const expectedAction: actionTypes.Interface['MENU_EXPAND_MENU'] = {
      type: actionTypes.MENU_EXPAND_MENU,
    };
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    });
  });

  describe('collapseMenu', () => {
    const action: actionTypes.Interface['MENU_COLLAPSE_MENU'] = actionCreators.collapseMenu();
    const expectedAction: actionTypes.Interface['MENU_COLLAPSE_MENU'] = {
      type: actionTypes.MENU_COLLAPSE_MENU,
    };
    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type)
    });
  });
});
