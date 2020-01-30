import React from 'react';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import asyncPoll from 'react-async-poll';
import withImmutablePropsToJS from 'with-immutable-props-to-js';

import { AppState } from 'core/store';
import { defaultRest } from 'core/rest/utils';
import config from 'app/config';
import * as AppTypes from 'app/types';

import LegacyService from 'app/services/legacy';
import * as Legacy from 'app/services/legacy/types';
import RachioService from 'app/services/rachio';
import * as Rachio from 'app/services/rachio/types';

import * as rachioActions from 'app/store/rachio/action/creators';
import * as rachioSelectors from 'app/store/rachio/selectors';

import Template from 'app/templates/LeftMenu';
import DevicesPage, { Props, DispatchProps } from './DevicesPage';

const services = {
  legacy: new LegacyService(
    config.services.legacy.url!,
    config.services.legacy.apiKey!,
    defaultRest,
  ),
  rachio: new RachioService(
    config.services.rachio.url!,
    config.services.rachio.apiKey!,
    defaultRest,
  ),
};

export const mapStateToProps = (
  state: AppState,
) => ({
  person: rachioSelectors.getPerson(state),
  thinking: rachioSelectors.getThinking(state),
  polling: rachioSelectors.getPolling(state),
  errors: rachioSelectors.getErrors(state),
  devices: rachioSelectors.getDevices(state),
  deviceNumZones: rachioSelectors.getDeviceNumZones(state),
});

export const mapDispatchToProps = (
  legacyService: Legacy.ServiceInterface,
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
  getDeviceState: (id: AppTypes.Device['id']) => dispatch(
    rachioActions.getDeviceState(id, legacyService)(dispatch),
  ),
  putDeviceOn: (id: AppTypes.Device['id']) => dispatch(
    rachioActions.putDeviceOn(id, rachioService)(dispatch),
  ),
  putDeviceOff: (id: AppTypes.Device['id']) => dispatch(
    rachioActions.putDeviceOff(id, rachioService)(dispatch),
  ),
});

export const onPollInterval = (
  { devices, getDeviceState }: Props,
  dispatch: Dispatch<AnyAction>,
) => {
  if (devices) {
    devices.forEach((device: AppTypes.Device) => {
      getDeviceState(device.id);
    });
  }
};

export const pollInterval: number = 2 * 1000;

export const ConnectedPage = connect(
  mapStateToProps,
  mapDispatchToProps(services.legacy, services.rachio),
)(withImmutablePropsToJS(
  asyncPoll(pollInterval, onPollInterval)(DevicesPage),
) as any);

export default () => (
  <Template title={`Devices`}>
    <ConnectedPage />
  </Template>
);
