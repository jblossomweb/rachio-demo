import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';

import { AppState } from 'core/store';
import { defaultRest } from 'core/rest/utils';
import config from 'app/config';
import * as AppTypes from 'app/types';

import RachioService from 'app/services/rachio';
import * as RachioServiceTypes from 'app/services/rachio/types';

import * as routerSelectors from 'app/store/router/selectors';
import * as menuSelectors from 'app/store/menu/selectors';
import * as menuActions from 'app/store/menu/action/creators';

import * as personActions from 'app/store/person/action/creators';
import * as personSelectors from 'app/store/person/selectors';

import { menu } from 'app/routes';

import HomePage, { DispatchProps } from './HomePage';

const rachioApiBase: string = config.services.rachio.url!;
const rachioApiKey: string = config.services.rachio.apiKey!;

const liveRachioService = new RachioService(
  rachioApiBase,
  rachioApiKey,
  defaultRest,
);

export const mapStateToProps = (
  state: AppState,
) => ({
  menu,
  menuCollapsed: menuSelectors.getCollapsed(state),
  currentPath: routerSelectors.getPathName(state),
  person: personSelectors.getPerson(state),
  personThinking: personSelectors.getThinking(state),
  personErrors: personSelectors.getErrors(state),
});

export const mapDispatchToProps = (
  rachioService: RachioServiceTypes.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
): DispatchProps => ({
  getPersonId: () => dispatch(
    personActions.getId(rachioService)(dispatch),
  ),
  getPerson: (id: AppTypes.Person['id']) => dispatch(
    personActions.getPerson(id, rachioService)(dispatch),
  ),
  collapseMenu: () => dispatch(
    menuActions.collapseMenu(),
  ),
  expandMenu: () => dispatch(
    menuActions.expandMenu(),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(liveRachioService),
)(withImmutablePropsToJS(
  HomePage,
) as any);
