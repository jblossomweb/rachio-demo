import React from 'react';
import * as Style from './LightCentered.style';

const LightCentered: React.FC = ({ children }) => (
  <Style.Wrapper>
    <Style.Header>
      {children}
    </Style.Header>
  </Style.Wrapper>
);

export default LightCentered;
