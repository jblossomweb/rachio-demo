import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';

import { AppState } from 'core/store';

import * as routerSelectors from 'app/store/router/selectors';
import * as menuSelectors from 'app/store/menu/selectors';
import * as menuActions from 'app/store/menu/action/creators';

import { menu } from 'app/routes';

import LeftMenu, { StateProps, DispatchProps, OwnProps } from './LeftMenu';
export * from './LeftMenu';

export const mapStateToProps = (
  state: AppState,
  props: OwnProps,
) => ({
  menu,
  menuCollapsed: menuSelectors.getCollapsed(state),
  currentPath: routerSelectors.getPathName(state),
  ...props,
});

export const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
): DispatchProps => ({
  collapseMenu: () => dispatch(
    menuActions.collapseMenu(),
  ),
  expandMenu: () => dispatch(
    menuActions.expandMenu(),
  ),
});

export const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps,
) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

const ConnectedTemplate: React.FC<OwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(withImmutablePropsToJS(
  LeftMenu,
) as any);

export default ConnectedTemplate;
