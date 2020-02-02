import React from 'react';
import TextField from '@material-ui/core/TextField';

import * as Style from './MinutesInput.style';

export interface Props {
  value?: number,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const MinutesInput: React.FC<Props> = ({
  value,
  onChange,
}) => (
  <Style.Wrapper>
    <TextField
      size={`small`}
      value={value}
      onChange={onChange}
      inputProps={{
        type: 'number',
        min: 0,
        max: 30,
      }}
    />&nbsp;Minutes
  </Style.Wrapper>
);

export default MinutesInput;
