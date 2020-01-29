import React from 'react';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';

import { AppState } from 'core/store';
import { defaultRest } from 'core/rest/utils';
import config from 'app/config';
import * as AppTypes from 'app/types';
import RachioService from 'app/services/rachio';
import * as RachioServiceTypes from 'app/services/rachio/types';
import * as rachioActions from 'app/store/rachio/action/creators';
import * as rachioSelectors from 'app/store/rachio/selectors';

import Template from 'app/templates/LeftMenu';
import DevicesPage, { DispatchProps } from './DevicesPage';

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
  devices: rachioSelectors.getDevices(state),
  deviceNumZones: rachioSelectors.getDeviceNumZones(state),
});

export const mapDispatchToProps = (
  rachioService: RachioServiceTypes.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
): DispatchProps => ({
  getPersonId: () => dispatch(
    rachioActions.getSelfId(rachioService)(dispatch),
  ),
  getPerson: (id: AppTypes.Person['id']) => dispatch(
    rachioActions.getPerson(id, rachioService)(dispatch),
  ),
  putDeviceOn: (id: AppTypes.Device['id']) => dispatch(
    rachioActions.putDeviceOn(id, rachioService)(dispatch),
  ),
  putDeviceOff: (id: AppTypes.Device['id']) => dispatch(
    rachioActions.putDeviceOff(id, rachioService)(dispatch),
  ),
});

export const ConnectedPage = connect(
  mapStateToProps,
  mapDispatchToProps(liveRachioService),
)(withImmutablePropsToJS(
  DevicesPage,
) as any);

export default () => (
  <Template title={`Devices`}>
    <ConnectedPage />
  </Template>
);
