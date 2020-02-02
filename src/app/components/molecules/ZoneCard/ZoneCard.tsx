import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  CircularProgress,
  Typography,
} from '@material-ui/core';

import * as AppTypes from 'app/types';
import StatusChip from 'app/components/atoms/StatusChip';
import RunButton from 'app/components/atoms/RunButton';
import RunDialog from 'app/components/molecules/RunDialog';

import { getStatus, getZoneRuns, defaultZoneRuns } from './ZoneCard.utils';
import * as Style from './ZoneCard.style';

export interface Props {
  zone: AppTypes.Zone,
  deviceOn: AppTypes.Device['on'],
  deviceStatus: AppTypes.Device['status'],
  runZone: (minutes: number) => void,
};

const ZoneCard: React.FC<Props> = ({
  zone,
  runZone,
  deviceOn,
  deviceStatus,
}) => {
  const defaultRunMinutes: number = 3;
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [runMinutes, setRunMinutes] = React.useState(defaultRunMinutes);
  const { lastRun, nextRun } =
    zone.state ?
    getZoneRuns(zone.state) :
    defaultZoneRuns
  ;
  const openDialog = () => {
    setDialogOpen(true);
    setRunMinutes(defaultRunMinutes);
  };
  const closeDialog = () => {
    setDialogOpen(false);
  };
  return (
    <Style.Wrapper>
      <Card>
        <CardHeader
          title={zone.name}
          subheader={zone.imageUrl ? (
            <Style.SubHeader>
              <Style.Image>
                <CardMedia image={zone.imageUrl} />
              </Style.Image>
            </Style.SubHeader>
          ) : undefined}
        />
        <CardContent>
          {zone.state ? (
            <Typography
              variant="body2"
              color="textSecondary"
              component="div"
            >
              <Style.Status>
                <StatusChip
                  status={getStatus(zone, deviceOn, deviceStatus)}
                />
              </Style.Status>
              Last Run: {lastRun}<br/>
              Next Run: {nextRun}<br/>
            </Typography>
          ) : (
            <CircularProgress />
          )}
        </CardContent>
        <CardActions disableSpacing>
          <RunButton
            text={`Quick Run`}
            onClick={openDialog}
          />
        </CardActions>
      </Card>
      <RunDialog
        title={`Run ${zone.name}`}
        open={dialogOpen}
        minutes={runMinutes}
        onClose={closeDialog}
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
          setRunMinutes(Number(target.value));
        }}
        onRun={() => {
          runZone(runMinutes);
          closeDialog();
        }}
      />
    </Style.Wrapper>
  );
};

export default ZoneCard;
