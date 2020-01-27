import React from 'react';
import Router from 'core/router';

import rootReducer from 'app/store/rootReducer';
import Theme from 'app/theme';

import { redirects, routes } from './routes';

const App: React.FC = () => (
  <Theme>
    <Router
      routes={routes}
      redirects={redirects}
      rootReducer={rootReducer}
    />
  </Theme>
);

export default App;
