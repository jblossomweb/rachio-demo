import { AppState } from 'core/store';

import paths from '../paths';
import * as types from './types';

/*
 * EXPAND_MENU
 */
export const expandMenu = (
  state: AppState,
) => state
  .setIn(paths.collapsed(), false);

/*
 * COLLAPSE_MENU
 */
export const collapseMenu = (
  state: AppState,
) => state
  .setIn(paths.collapsed(), true);

/*
 * default export
 */
export default {
  [types.EXPAND_MENU as string]: expandMenu,
  [types.COLLAPSE_MENU as string]: collapseMenu,
};
