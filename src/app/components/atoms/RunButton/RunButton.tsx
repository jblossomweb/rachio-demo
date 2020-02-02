import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import * as Style from './RunButton.style';

export interface Props {
  text: string,
  onClick?: (event: any) => void,
}

const RunButton: React.FC<Props> = ({
  text,
  onClick,
}) => (
  <Style.Wrapper>
    <Button
      startIcon={<Icon>play_arrow</Icon>}
      onClick={onClick}
    >
      {text}
    </Button>
  </Style.Wrapper>
);

export default RunButton;
