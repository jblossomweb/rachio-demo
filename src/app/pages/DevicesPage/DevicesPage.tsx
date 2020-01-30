import React from 'react';

import * as AppTypes from 'app/types';
import Spinner from 'app/components/atoms/Spinner';
import DeviceCard from 'app/components/molecules/DeviceCard';

import * as Style from './DevicesPage.style';

export interface StateProps {
  person?: AppTypes.Person,
  thinking?: boolean,
  polling?: boolean,
  errors?: AppTypes.Error[],
  devices?: AppTypes.Device[],
  deviceNumZones: (id: AppTypes.Device['id']) => number,
};

export interface DispatchProps {
  getPersonId: () => void,
  getPerson: (id: AppTypes.Person['id']) => void,
  getDeviceState: (id: AppTypes.Device['id']) => void,
  putDeviceOn: (id: AppTypes.Device['id']) => void,
  putDeviceOff: (id: AppTypes.Device['id']) => void,
};

export type Props = StateProps & DispatchProps;

const DevicesPage: React.FC<Props> = ({
  person,
  getPersonId,
  getPerson,
  thinking,
  errors,
  devices,
  deviceNumZones,
  putDeviceOn,
  putDeviceOff,
}) => {
  if (!thinking && (!person || !person.id)) {
    getPersonId();
  }
  if (!thinking && (person && !devices)) {
    getPerson(person.id);
  }
  return (
    <Style.Wrapper>
      <Spinner visible={!!thinking && !devices} />
      {devices?.map((
        device: AppTypes.Device,
      ) => (
        <DeviceCard
          key={device.id}
          device={device}
          numZones={deviceNumZones(device.id)}
          putDeviceOn={putDeviceOn}
          putDeviceOff={putDeviceOff}
        />
      ))}
    </Style.Wrapper>
  );
};

export default DevicesPage;
