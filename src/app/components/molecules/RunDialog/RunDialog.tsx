import React from 'react';
import {
 Dialog,
 DialogTitle,
 DialogContent,
 DialogActions,
} from '@material-ui/core';

import MinutesInput from 'app/components/atoms/MinutesInput';
import RunButton from 'app/components/atoms/RunButton';
import CancelButton from 'app/components/atoms/CancelButton';

import * as Style from './RunDialog.style';

export interface Props {
  title?: string,
  open?: boolean,
  minutes?: number,
  onClose?: () => void,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onRun?: () => void,
};

const RunDialog: React.FC<Props> = ({
  title,
  open,
  minutes,
  onClose,
  onChange,
  onRun,
}) => {
  return (
    <Style.Wrapper>
      <Dialog
        open={!!open}
        onClose={onClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <MinutesInput
            value={minutes}
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
            <CancelButton
              text={`Cancel`}
              onClick={onClose}
            />
            <RunButton
              text={`Start`}
              onClick={onRun}
            />
        </DialogActions>
      </Dialog>
    </Style.Wrapper>
  );
};

export default RunDialog;
