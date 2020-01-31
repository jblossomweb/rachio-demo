import React from 'react';

import * as AppTypes from 'app/types';
import Spinner from 'app/components/atoms/Spinner';
import PersonCard from 'app/components/molecules/PersonCard';

import * as Style from './HomePage.style';

export interface StateProps {
  person?: AppTypes.Person,
  thinking?: boolean,
  errors?: AppTypes.Error[],
  devicesLoaded: boolean,
  numDevices: number,
};

export interface DispatchProps {
  getPersonId: () => void,
  getPerson: (id: AppTypes.Person['id']) => void,
};

export type Props = StateProps & DispatchProps;

const HomePage: React.FC<Props> = ({
  getPersonId,
  person,
  getPerson,
  thinking,
  errors,
  devicesLoaded,
  numDevices,
}) => {
  if ((!person || !person.id) && !thinking && !errors?.length) {
    getPersonId();
  }
  if (person && !devicesLoaded && !thinking && !errors?.length) {
    getPerson(person.id);
  }
  return (
    <Style.Wrapper>
      <Spinner visible={!!thinking} />
      { person && person.username ? (
        <PersonCard
          person={person}
          numDevices={numDevices}
        />
      ) : null}
    </Style.Wrapper>
  );
};

export default HomePage;
