import React from 'react';
import {
  Card,
  CardContent,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

import * as AppTypes from 'app/types';
import * as Style from './ZonesFilter.style';

export interface Props {
  zonesFilter?: Partial<AppTypes.Zone>,
  setZonesFilter: (filter: Partial<AppTypes.Zone>) => void,
  clearZonesFilter: () => void,
  deviceIds?: Array<AppTypes.Device['id']>,
  getDeviceName: (id: AppTypes.Device['id']) => AppTypes.Device['name'],
};

const ZonesFilter: React.FC<Props> = ({
  zonesFilter,
  setZonesFilter,
  clearZonesFilter,
  deviceIds,
  getDeviceName,
}) => {
  return (
    <Style.Wrapper>
      <Card>
        <CardContent>
          <InputLabel>Filter:</InputLabel>
          <Select
            value={zonesFilter?.deviceId || 'All'}
            onChange={({ target: { value } }) => {
              if (value !== 'All') {
                setZonesFilter({ deviceId: String(value) });
              } else {
                clearZonesFilter();
              }
            }}
          >
            <MenuItem value={'All'}>All Zones</MenuItem>
            {deviceIds ? deviceIds.map((
              id: AppTypes.Device['id'],
            ) => (
              <MenuItem key={id} value={id}>{getDeviceName(id)}</MenuItem>
            )) : null}
          </Select>
        </CardContent>
      </Card>
    </Style.Wrapper>
  );
};

export default ZonesFilter;
