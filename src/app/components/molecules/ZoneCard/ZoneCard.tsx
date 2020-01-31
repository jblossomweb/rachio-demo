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
} from '@material-ui/core';

import * as AppTypes from 'app/types';
import StatusChip from 'app/components/atoms/StatusChip';
import { getStatus, getZoneRuns, defaultZoneRuns } from './ZoneCard.utils';
import * as Style from './ZoneCard.style';

export interface Props {
  zone: AppTypes.Zone,
  deviceOn: AppTypes.Device['on'],
  deviceStatus: AppTypes.Device['status'],
};

const ZoneCard: React.FC<Props> = ({
  zone,
  deviceOn,
  deviceStatus,
}) => {
  const { lastRun, nextRun } =
    zone.state ?
    getZoneRuns(zone.state) :
    defaultZoneRuns
  ;
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
          <Button
            startIcon={<Icon>play_arrow</Icon>}
            // onClick={handleQuickRun}
          >
            Quick Run
          </Button>
        </CardActions>
      </Card>
    </Style.Wrapper>
  );
};

export default ZoneCard;
