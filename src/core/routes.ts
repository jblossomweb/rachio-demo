import { RouteProps } from 'react-router-dom';

export interface Route {
  path: string,
  page: RouteProps['component'],
  title?: string,
  [key: string]: any,
};

export interface Redirect {
  from?: string,
  to: string,
};
