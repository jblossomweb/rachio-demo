import React from 'react';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import getHistory from 'core/history';
import { composeStore, getInitialState } from 'core/store';
import * as Types from 'core/routes';

export interface Props {
  routes: Types.Route[],
  redirects: Types.Redirect[],
  rootReducer: any,
};

const Router: React.FC<Props> = ({
  routes,
  redirects,
  rootReducer,
}) => (
  <Provider store={composeStore(getInitialState(), rootReducer)}>
    <ConnectedRouter history={getHistory()}>
      <Switch>
        {routes.map((route: Types.Route) => (
          <Route
            key={route.path}
            exact={true}
            path={route.path}
            component={route.page}
          />
        ))}
        {redirects.map((
          redirect: Types.Redirect,
          key: number,
        ) => (
          <Redirect
            key={key}
            exact={true}
            from={redirect.from || undefined}
            to={redirect.to}
          />
        ))}
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default Router;
