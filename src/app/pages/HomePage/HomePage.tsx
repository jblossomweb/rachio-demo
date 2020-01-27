import React from 'react';
import Template from 'app/templates/LightCentered';
import * as Style from './HomePage.style';

export interface StateProps {
  imgSrc: string,
};

export interface DispatchProps {
  doNothing: () => void,
};

export type Props = StateProps & DispatchProps;

const HomePage: React.FC<Props> = ({
  imgSrc,
}) => (
  <Template>
    <Style.Wrapper>
      <h1>Rachio Demo</h1>
      <img src={imgSrc} alt={"Rachio Demo"} />
      <p>
        Zones User Interface
      </p>
    </Style.Wrapper>
  </Template>
);

export default HomePage;
