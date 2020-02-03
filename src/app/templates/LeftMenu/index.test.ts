import { Dispatch, AnyAction } from 'redux';
import { getInitialState, AppState } from 'core/store';

import * as routerSelectors from 'app/store/router/selectors';
import * as menuSelectors from 'app/store/menu/selectors';
import * as rachioSelectors from 'app/store/rachio/selectors';
import * as menuActions from 'app/store/menu/action/creators';
import * as rachioActions from 'app/store/rachio/action/creators';

import { DispatchProps } from './LeftMenu';

import {
  mapStateToProps,
  mapDispatchToProps,
} from './index';

describe('templates/LeftMenu (redux wireup)', () => {
  describe('mapStateToProps', () => {
    const spies = {
      getCollapsed: jest.spyOn(menuSelectors, 'getCollapsed'),
      getPathName: jest.spyOn(routerSelectors, 'getPathName'),
      getErrors: jest.spyOn(rachioSelectors, 'getErrors'),
    }

    const state: AppState = getInitialState()
    const stateProps = mapStateToProps(state, {})

    it('calls menuSelectors.getCollapsed to yield menuCollapsed prop', () => {
      expect(spies.getCollapsed).toHaveBeenCalled()
      expect(stateProps.menuCollapsed).toEqual(menuSelectors.getCollapsed(state))
      spies.getCollapsed.mockClear()
    });

    it('calls routerSelectors.getPathName to yield currentPath prop', () => {
      expect(spies.getPathName).toHaveBeenCalled()
      expect(stateProps.currentPath).toEqual(routerSelectors.getPathName(state))
      spies.getPathName.mockClear()
    });

    it('calls rachioSelectors.getErrors to yield errors prop', () => {
      expect(spies.getErrors).toHaveBeenCalled()
      expect(stateProps.errors).toEqual(rachioSelectors.getErrors(state))
      spies.getErrors.mockClear()
    });
  })

  describe('mapDispatchToProps', () => {
    const spies = {
      collapseMenu: jest.spyOn(menuActions, 'collapseMenu'),
      expandMenu: jest.spyOn(menuActions, 'expandMenu'),
      clearData: jest.spyOn(rachioActions, 'clearData'),
      dismissError: jest.spyOn(rachioActions, 'dismissError'),
    }
    const dispatch: Dispatch<AnyAction> = (action: AnyAction) => action.type

    const dispatchProps: DispatchProps = mapDispatchToProps(dispatch)

    it('maps a dispatch to menuActions.collapseMenu as collapseMenu prop', () => {
      const prop = dispatchProps.collapseMenu()
      expect(spies.collapseMenu).toHaveBeenCalled()
      expect(prop).toEqual(dispatch(menuActions.collapseMenu()))
      spies.collapseMenu.mockClear()
    })

    it('maps a dispatch to menuActions.expandMenu as expandMenu prop', () => {
      const prop = dispatchProps.expandMenu()
      expect(spies.expandMenu).toHaveBeenCalled()
      expect(prop).toEqual(dispatch(menuActions.expandMenu()))
      spies.expandMenu.mockClear()
    })

    it('maps a dispatch to rachioActions.clearData as refreshData prop', () => {
      const prop = dispatchProps.refreshData()
      expect(spies.clearData).toHaveBeenCalled()
      expect(prop).toEqual(dispatch(rachioActions.clearData()))
      spies.clearData.mockClear()
    })

    it('maps a dispatch to rachioActions.dismissError as dismissError prop', () => {
      const key: number = 7;
      const prop = dispatchProps.dismissError(key)
      expect(spies.dismissError).toHaveBeenCalled()
      expect(spies.dismissError).toHaveBeenLastCalledWith(key)
      expect(prop).toEqual(dispatch(rachioActions.dismissError(key)))
      spies.dismissError.mockClear()
    })
  })
})
