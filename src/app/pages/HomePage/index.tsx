import React from 'react';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';

import { AppState } from 'core/store';
import { defaultRest } from 'core/rest/utils';
import config from 'app/config';
import * as AppTypes from 'app/types';
import RachioService, { Types as Rachio } from 'app/services/rachio';
import * as rachioActions from 'app/store/rachio/action/creators';
import * as rachioSelectors from 'app/store/rachio/selectors';

import Template from 'app/templates/LeftMenu';
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
  person: rachioSelectors.getPerson(state),
  thinking: rachioSelectors.getThinking(state),
  errors: rachioSelectors.getErrors(state),
  devicesLoaded: rachioSelectors.getDevicesLoaded(state),
  numDevices: rachioSelectors.getNumDevices(state),
});

export const mapDispatchToProps = (
  rachioService: Rachio.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
): DispatchProps => ({
  getPersonId: () => dispatch(
    rachioActions.getSelfId(rachioService)(dispatch),
  ),
  getPerson: (id: AppTypes.Person['id']) => dispatch(
    rachioActions.getPerson(id, rachioService)(dispatch),
  ),
});

export const ConnectedPage = connect(
  mapStateToProps,
  mapDispatchToProps(liveRachioService),
)(withImmutablePropsToJS(
  HomePage,
) as any);

export default () => (
  <Template title={`Home`}>
    <ConnectedPage />
  </Template>
);
