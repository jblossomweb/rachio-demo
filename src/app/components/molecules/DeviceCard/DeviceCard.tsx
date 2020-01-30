import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Button,
  Typography,
  Switch,
  Icon,
} from '@material-ui/core';

import config from 'app/config';
import * as AppTypes from 'app/types';
import { getStatus, deviceStatus } from './DeviceCard.utils';
import * as Style from './DeviceCard.style';

const deviceImage: string = `${config.publicUrl}/device.png`;

export interface Props {
  device: AppTypes.Device,
  numZones: number,
  putDeviceOn: (id: AppTypes.Device['id']) => void,
  putDeviceOff: (id: AppTypes.Device['id']) => void,
};

const DeviceCard: React.FC<Props> = ({
  device,
  numZones,
  putDeviceOn,
  putDeviceOff,
}) => {
  const [status, statusIcon, statusColor] = getStatus(device) || deviceStatus.OFFLINE;
  return (
    <Style.Wrapper>
      <Card>
        <CardHeader
          title={device.name}
          subheader={
            <Style.SubHeader>
              <Style.Image>
                <CardMedia image={deviceImage} />
              </Style.Image>
            </Style.SubHeader>
          }
          action={
            <>
            {device.on ? `ON` : `OFF`}&nbsp;
            <Switch
              color={`primary`}
              checked={device.on}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (device.on) {
                  putDeviceOff(device.id);
                } else {
                  putDeviceOn(device.id);
                }
              }}
            />
            </>
          }
        />
        <CardContent>
          <Style.Status>
            <Chip
              icon={<Icon>{statusIcon}</Icon>}
              color={`primary`}
              className={statusColor}
              label={status}
            />
          </Style.Status>
          <Style.Icon>
            <Icon>access_time</Icon>&nbsp;{device.timeZone}
          </Style.Icon>
          <Typography variant="body2" color="textSecondary" component="p">
            Serial Number: {device.serialNumber}<br/>
            MAC Address: {device.macAddress}<br/>
          </Typography>
          {device.homeKitCompatible ? (
            <Style.GreenCheck>
              <Icon>check</Icon>&nbsp;Home Kit Compatible
            </Style.GreenCheck>
          ) : null}
        </CardContent>
        <CardActions disableSpacing>
          <Link to={`/devices/${device.id}/zones`}>
            <Button>
              Show {numZones} Zones
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Style.Wrapper>
  );
};

export default DeviceCard;
