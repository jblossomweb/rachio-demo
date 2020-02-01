import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@material-ui/core';

import * as AppTypes from 'app/types';
import StatusChip from 'app/components/atoms/StatusChip';
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
                <StatusChip status={getStatus(zone, deviceOn, deviceStatus)} />
              </Style.Status>
              Last Run: {lastRun}<br/>
              Next Run: {nextRun}<br/>
            </Typography>
          ) : null}
        </CardContent>
        <CardActions disableSpacing>
          <Style.RunButton>
            <Button
              startIcon={<Icon>play_arrow</Icon>}
              onClick={openDialog}
            >
              Quick Run
            </Button>
          </Style.RunButton>
        </CardActions>
      </Card>
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
      >
        <DialogTitle>Run {zone.name}</DialogTitle>
        <DialogContent>
          <Style.MinutesInput>
            <TextField
              size={`small`}
              value={runMinutes}
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
                setRunMinutes(Number(target.value));
              }}
              inputProps={{
                type: 'number',
                min: 0,
                max: 30,
              }}
            />&nbsp;Minutes
          </Style.MinutesInput>
        </DialogContent>
        <DialogActions>
            <Style.CancelButton>
              <Button
                startIcon={<Icon>cancel</Icon>}
                onClick={closeDialog}
              >
                Cancel
              </Button>
            </Style.CancelButton>
            <Style.RunButton>
              <Button
                startIcon={<Icon>play_arrow</Icon>}
                onClick={() => {
                  runZone(runMinutes);
                  closeDialog();
                }}
              >
                Start
              </Button>
            </Style.RunButton>
        </DialogActions>
      </Dialog>
    </Style.Wrapper>
  );
};

export default ZoneCard;
