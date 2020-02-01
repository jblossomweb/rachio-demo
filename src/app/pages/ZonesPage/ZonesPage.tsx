import React from 'react';

import * as AppTypes from 'app/types';
import Spinner from 'app/components/atoms/Spinner';
import ZoneCard from 'app/components/molecules/ZoneCard';

import * as Style from './ZonesPage.style';

export interface StateProps {
  person?: AppTypes.Person,
  thinking?: boolean,
  polling?: boolean,
  errors?: AppTypes.Error[],
  zones?: AppTypes.Zone[],
  getDeviceOn: (id: AppTypes.Device['id']) => AppTypes.Device['on'],
  getDeviceStatus: (id: AppTypes.Device['id']) => AppTypes.Device['status'],
};

export interface DispatchProps {
  getPersonId: () => void,
  getPerson: (id: AppTypes.Person['id']) => void,
  getDeviceState: (id: AppTypes.Device['id']) => void,
  getDeviceZoneSummary: (id: AppTypes.Device['id']) => void,
  putZoneStart: (id: AppTypes.Zone['id'], duration: number) => void,
};

export type Props = StateProps & DispatchProps;

const ZonesPage: React.FC<Props> = ({
  person,
  getPersonId,
  getPerson,
  thinking,
  errors,
  zones,
  getDeviceOn,
  getDeviceStatus,
  putZoneStart,
}) => {
  if ((!person || !person.id) && !thinking && !errors?.length) {
    getPersonId();
  }
  if (person && !zones && !thinking && !errors?.length) {
    getPerson(person.id);
  }
  return (
    <Style.Wrapper>
      <Spinner visible={!!thinking && !zones} />
      {zones ? zones.map((
        zone: AppTypes.Zone,
      ) => (
        <ZoneCard
          key={zone.id}
          zone={zone}
          deviceOn={getDeviceOn(zone.deviceId)}
          deviceStatus={getDeviceStatus(zone.deviceId)}
          runZone={minutes => putZoneStart(zone.id, minutes * 60)}
        />
      )) : null}
    </Style.Wrapper>
  );
};

export default ZonesPage;
