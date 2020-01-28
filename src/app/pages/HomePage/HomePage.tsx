import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Template from 'app/templates/LeftMenu';
import * as AppTypes from 'app/types';
import { MenuRoute } from 'app/routes';
import * as Style from './HomePage.style';

export interface StateProps {
  menu: MenuRoute[],
  menuCollapsed?: boolean,
  currentPath: MenuRoute['path'],
  person?: AppTypes.Person,
  personThinking?: boolean,
  personErrors?: AppTypes.Error[],
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
        <Backdrop open={!!personThinking}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <h1>Rachio Demo</h1>
        <p>
          { person ? (JSON.stringify(person)) : 'Zones User Interface'}
        </p>
      </Style.Wrapper>
    </Template>
  );
};

export default HomePage;
