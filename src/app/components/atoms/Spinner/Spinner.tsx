import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface Props {
  visible: boolean,
}

const Spinner: React.FC<Props> = ({ visible }) => (
  <Backdrop open={visible}>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default Spinner;
