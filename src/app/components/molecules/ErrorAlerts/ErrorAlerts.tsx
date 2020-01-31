import React from 'react';
import {
 Snackbar,
} from '@material-ui/core';

import ErrorAlert from 'app/components/atoms/ErrorAlert';

import * as AppTypes from 'app/types';
import * as Style from './ErrorAlerts.style';

export interface Props {
  errors: AppTypes.Error[],
  dismissError: (key: number) => void,
};

const ErrorAlerts: React.FC<Props> = ({
  errors,
  dismissError,
}) => {
  return (
    <Style.Wrapper>
      {!!errors.length ? (
        <Snackbar
          open
          anchorOrigin={{
            vertical: `bottom`,
            horizontal: `right`,
          }}
        >
          <>
          {errors.map((error, key) => (
            <ErrorAlert
              key={key}
              error={error}
              dismissError={() => {
                dismissError(key);
              }}
            />
          ))}
          </>
        </Snackbar>
      ) : null}
    </Style.Wrapper>
  );
};

export default ErrorAlerts;
