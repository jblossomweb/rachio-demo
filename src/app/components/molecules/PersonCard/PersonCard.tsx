import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
} from '@material-ui/core';

import * as AppTypes from 'app/types';
import LinkButton from 'app/components/atoms/LinkButton';

export interface Props {
  person: AppTypes.Person,
  numDevices: number,
};

const PersonCard: React.FC<Props> = ({
  person,
  numDevices,
}) => (
  <Card>
    <CardHeader
      avatar={
        <Avatar>
          {/* TODO: we could put an avatar here if it were available */}
          {person.username.charAt(0).toUpperCase()}
        </Avatar>
      }
      title={person.fullName}
      subheader={person.email}
    />
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        Welcome, {person.fullName}! You have {numDevices} devices.
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <LinkButton
        to={`/devices`}
        icon={`videogame_asset`}
        text={`Show ${numDevices} Devices`}
      />
    </CardActions>
  </Card>
);

export default PersonCard;
