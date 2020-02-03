import React from 'react';
import {
 IconButton,
 Icon,
} from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';

import * as AppTypes from 'app/types';
import * as Style from './ErrorAlert.style';

export interface Props {
  error: AppTypes.Error,
  dismissError: () => void,
};

const ErrorAlert: React.FC<Props> = ({
  error,
  dismissError,
}) => (
  <Style.Wrapper>
    <MuiAlert
      elevation={6}
      variant={`filled`}
      severity={`error`}
      onClose={dismissError}
      action={(
        <IconButton
          size={`small`}
          aria-label={`close`}
          color={`inherit`}
          onClick={dismissError}
        >
          <Icon fontSize="small">close</Icon>
        </IconButton>
      )}
    >
      {error.message || 'something went wrong'}
    </MuiAlert>
  </Style.Wrapper>
);

export default ErrorAlert;
