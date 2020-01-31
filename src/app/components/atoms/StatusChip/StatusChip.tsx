import React from 'react';
import { Chip, Icon } from '@material-ui/core';

import { StateString } from './StatusChip.types';
import { STATES } from './StatusChip.constants';
import * as Style from './StatusChip.style';

export interface Props {
  status: StateString,
}

const StatusChip: React.FC<Props> = ({ status }) => {
  const [state, icon, color] = STATES[status];
  return (
    <Style.Wrapper>
      <Chip
        icon={<Icon>{icon}</Icon>}
        color={`primary`}
        className={color}
        label={state}
      />
    </Style.Wrapper>
  );
};

export default StatusChip;
