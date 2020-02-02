import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import * as Style from './CancelButton.style';

export interface Props {
  text: string,
  onClick?: (event: any) => void,
}

const CancelButton: React.FC<Props> = ({
  text,
  onClick,
}) => (
  <Style.Wrapper>
    <Button
      startIcon={<Icon>cancel</Icon>}
      onClick={onClick}
    >
      {text}
    </Button>
  </Style.Wrapper>
);

export default CancelButton;
