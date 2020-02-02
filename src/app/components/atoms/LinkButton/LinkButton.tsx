import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import * as Style from './LinkButton.style';

export interface Props {
  to: string,
  icon?: string,
  text: string,
}

const LinkButton: React.FC<Props> = ({
  to,
  icon,
  text,
}) => (
  <Style.Wrapper>
    <Link to={to}>
      <Button
        startIcon={icon && (<Icon>{icon}</Icon>)}
      >
        {text}
      </Button>
    </Link>
  </Style.Wrapper>
);

export default LinkButton;
