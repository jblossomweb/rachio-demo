import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Button,
  Typography,
} from '@material-ui/core';

import * as AppTypes from 'app/types';

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
      <Link to={`/devices`}>
        <Button>
          Show {numDevices} devices
        </Button>
      </Link>
    </CardActions>
  </Card>
);

export default PersonCard;
