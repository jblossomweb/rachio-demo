import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Switch,
  Icon,
} from '@material-ui/core';

import config from 'app/config';
import * as AppTypes from 'app/types';
import StatusChip from 'app/components/atoms/StatusChip';
import RunButton from 'app/components/atoms/RunButton';
import LinkButton from 'app/components/atoms/LinkButton';
import RunDialog from 'app/components/molecules/RunDialog';

import { getStatus } from './DeviceCard.utils';
import * as Style from './DeviceCard.style';

const deviceImage: string = `${config.publicUrl}/device.png`;

export interface Props {
  device: AppTypes.Device,
  zoneIds: Array<AppTypes.Zone['id']>,
  putDeviceOn: (id: AppTypes.Device['id']) => void,
  putDeviceOff: (id: AppTypes.Device['id']) => void,
  putZoneStartMultiple: (zones: AppTypes.ZoneStartMultiple) => void,
};

const DeviceCard: React.FC<Props> = ({
  device,
  zoneIds,
  putDeviceOn,
  putDeviceOff,
  putZoneStartMultiple,
}) => {
  const status = getStatus(device);
  const numZones = zoneIds.length;
  const defaultRunMinutes: number = 3;
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [runMinutes, setRunMinutes] = React.useState(defaultRunMinutes);
  const openDialog = () => {
    setDialogOpen(true);
    setRunMinutes(defaultRunMinutes);
  };
  const closeDialog = () => {
    setDialogOpen(false);
  };
  const runAllZones = (minutes: number) => {
    putZoneStartMultiple(zoneIds.map(
      (id, index) => ({
        id,
        duration: minutes * 60,
        sortOrder: index + 1,
      })
    ));
  };
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
          <StatusChip status={status} />
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
          <LinkButton
            to={`/zones?deviceId=${device.id}`}
            icon={`eco`}
            text={`Show ${numZones} Zones`}
          />
          <RunButton
            text={`Quick Run All`}
            disabled={!device.on || ['OFFLINE', 'EXTENDED_OFFLINE', 'STANDBY'].includes(status)}
            onClick={openDialog}
          />
        </CardActions>
      </Card>
      <RunDialog
        title={`${device.name}: ${numZones} zones`}
        open={dialogOpen}
        minutes={runMinutes}
        onClose={closeDialog}
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
          setRunMinutes(Number(target.value));
        }}
        onRun={() => {
          runAllZones(runMinutes);
          closeDialog();
        }}
      />
    </Style.Wrapper>
  );
};

export default DeviceCard;
