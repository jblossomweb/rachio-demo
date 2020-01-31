import React from 'react';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import asyncPoll from 'react-async-poll';
import withImmutablePropsToJS from 'with-immutable-props-to-js';

import { AppState } from 'core/store';
import { defaultRest } from 'core/rest/utils';
import config from 'app/config';
import * as AppTypes from 'app/types';

import LegacyService, { Types as Legacy } from 'app/services/legacy';
import RachioService, { Types as Rachio } from 'app/services/rachio';

import * as rachioActions from 'app/store/rachio/action/creators';
import * as rachioSelectors from 'app/store/rachio/selectors';

import Template from 'app/templates/LeftMenu';
import ZonesPage, { Props, DispatchProps } from './ZonesPage';

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
  zones: rachioSelectors.getZones(state),
  getDeviceOn: rachioSelectors.getDeviceOn(state),
  getDeviceStatus: rachioSelectors.getDeviceStatus(state),
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
  getDeviceZoneSummary: (id: AppTypes.Device['id']) => dispatch(
    rachioActions.getDeviceZoneSummary(id, legacyService)(dispatch),
  ),
});

export const onPollInterval = (
  { zones, getDeviceState, getDeviceZoneSummary, polling, errors }: Props,
  dispatch: Dispatch<AnyAction>,
) => {
  if (zones && !polling && !errors?.length) {
    const deviceIds: Array<AppTypes.Device['id']> = [];
    zones.forEach(({ deviceId }: AppTypes.Zone) => {
      if (!deviceIds.includes(deviceId)) {
        deviceIds.push(deviceId);
      }
    });
    deviceIds.forEach((deviceId: AppTypes.Device['id']) => {
      getDeviceState(deviceId); // needed for currentRunningZone
      getDeviceZoneSummary(deviceId);
    });
  }
};

export const pollInterval: number = 4 * 1000;

export const ConnectedPage = connect(
  mapStateToProps,
  mapDispatchToProps(services.legacy, services.rachio),
)(withImmutablePropsToJS(
  asyncPoll(pollInterval, onPollInterval)(ZonesPage),
) as any);

export default () => (
  <Template title={`Zones`}>
    <ConnectedPage />
  </Template>
);
