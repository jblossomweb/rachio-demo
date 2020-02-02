import React from 'react';
import { useHistory } from "react-router-dom";
import queryString from 'querystring';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import pick from 'lodash/pick';

import * as AppTypes from 'app/types';
import Spinner from 'app/components/atoms/Spinner';
import ZoneCard from 'app/components/molecules/ZoneCard';
import ZonesFilter from 'app/components/molecules/ZonesFilter';

import * as Style from './ZonesPage.style';

export interface StateProps {
  person?: AppTypes.Person,
  thinking?: boolean,
  polling?: boolean,
  errors?: AppTypes.Error[],
  deviceIds?: Array<AppTypes.Device['id']>,
  zones?: AppTypes.Zone[],
  queryParams: { [key: string]: string };
  getDeviceOn: (id: AppTypes.Device['id']) => AppTypes.Device['on'],
  getDeviceStatus: (id: AppTypes.Device['id']) => AppTypes.Device['status'],
  getDeviceName: (id: AppTypes.Device['id']) => AppTypes.Device['name'],
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
  deviceIds,
  zones,
  queryParams,
  getDeviceOn,
  getDeviceStatus,
  getDeviceName,
  putZoneStart,
}) => {
  const history = useHistory();
  const setZonesFilter = (filter: Partial<AppTypes.Zone>) => {
    history.push({
      search: `?${queryString.stringify(filter as any)}`,
    });
  };
  const clearZonesFilter = () => {
    history.push({
      search: '',
    });
  };
  if ((!person || !person.id) && !thinking && !errors?.length) {
    getPersonId();
  }
  if (person && !zones && !thinking && !errors?.length) {
    getPerson(person.id);
  }
  const zonesFilter: Partial<AppTypes.Zone> = pick(queryParams, ['deviceId']);
  const allZones: AppTypes.Zone[] =
    zones ?
    sortBy(zones, ['zoneNumber']) :
    []
  ;
  const visibleZones: AppTypes.Zone[] =
    zonesFilter ?
    filter(allZones, zonesFilter) :
    allZones
  ;
  return (
    <Style.Wrapper>
      <Spinner visible={!!thinking && !zones} />
      <ZonesFilter
        zonesFilter={zonesFilter}
        setZonesFilter={setZonesFilter}
        clearZonesFilter={clearZonesFilter}
        deviceIds={deviceIds}
        getDeviceName={getDeviceName}
      />
      {visibleZones?.map((
        zone: AppTypes.Zone,
      ) => (
        <ZoneCard
          key={zone.id}
          zone={zone}
          deviceOn={getDeviceOn(zone.deviceId)}
          deviceStatus={getDeviceStatus(zone.deviceId)}
          runZone={minutes => putZoneStart(zone.id, minutes * 60)}
        />
      ))}
    </Style.Wrapper>
  );
};

export default ZonesPage;
