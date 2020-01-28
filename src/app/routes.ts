import { Redirect, Route } from 'core/routes';

import Page404 from 'app/pages/404';
import HomePage from 'app/pages/HomePage';
// import DevicesPage from 'app/pages/DevicesPage';
// import ZonesPage from 'app/pages/ZonesPage';

export interface MenuRoute extends Route {
  title: string,
  icon: string, // TODO: would be nice to type this
};

export const menu: MenuRoute[] = [
  {
    path: `/me`,
    page: HomePage,
    title: 'My Profile',
    icon: 'person',
  },
  {
    path: `/devices`,
    page: HomePage,
    title: 'My Devices',
    icon: 'videogame_asset',
  },
  {
    path: `/zones`,
    page: HomePage,
    title: 'My Zones',
    icon: 'eco',
  },
];

export const routes: Route[] = [
  {
    path: `/home`,
    page: HomePage,
  },
  ...menu,
  {
    path: `/404`,
    page: Page404,
  },
];

export const redirects: Redirect[] = [
  {
    from: `/`,
    to: `/home`,
  },
  {
    to: `/404`
  },
];

export default routes;
