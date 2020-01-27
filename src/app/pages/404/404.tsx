import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import Template from 'app/templates/LightCentered';

export default () => (
  <Template>
    <p>Sorry! That page was not found.</p>
    <p>
      <Link to={`/`}>
        <Button
          color={`primary`}
        >
          Back to Home
        </Button>
      </Link>
    </p>
  </Template>
);
