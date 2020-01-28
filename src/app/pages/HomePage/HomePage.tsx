import React from 'react';

import * as AppTypes from 'app/types';
import { MenuRoute } from 'app/routes';

import Template from 'app/templates/LeftMenu';
import Spinner from 'app/components/atoms/Spinner';
import PersonCard from 'app/components/molecules/PersonCard';

import * as Style from './HomePage.style';

export interface StateProps {
  menu: MenuRoute[],
  menuCollapsed?: boolean,
  currentPath: MenuRoute['path'],
  person?: AppTypes.Person,
  personThinking?: boolean,
  personErrors?: AppTypes.Error[],
  numDevices: number,
};

export interface DispatchProps {
  getPersonId: () => void,
  getPerson: (id: AppTypes.Person['id']) => void,
  collapseMenu: () => void,
  expandMenu: () => void,
};

export type Props = StateProps & DispatchProps;

const HomePage: React.FC<Props> = ({
  menu,
  menuCollapsed,
  collapseMenu,
  expandMenu,
  currentPath,
  getPersonId,
  person,
  getPerson,
  personThinking,
  numDevices,
}) => {
  if (!person || !person.id) {
    getPersonId();
  }
  if (person && !person.email) {
    getPerson(person.id);
  }
  return (
    <Template
      title={'Home Page'}
      menu={menu}
      menuCollapsed={menuCollapsed}
      currentPath={currentPath}
      collapseMenu={collapseMenu}
      expandMenu={expandMenu}
    >
      <Style.Wrapper>
        <Spinner visible={!!personThinking} />
        { person && person.username ? (
          <PersonCard
            person={person}
            numDevices={numDevices}
          />
        ) : null}
      </Style.Wrapper>
    </Template>
  );
};

export default HomePage;
