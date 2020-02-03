import { AppState } from 'core/store';

import paths from '../paths';
import * as types from './types';

/*
 * MENU_EXPAND_MENU
 */
export const expandMenu = (
  state: AppState,
) => state
  .setIn(paths.collapsed(), false);

/*
 * MENU_COLLAPSE_MENU
 */
export const collapseMenu = (
  state: AppState,
) => state
  .setIn(paths.collapsed(), true);

/*
 * default export
 */
export default {
  [types.MENU_EXPAND_MENU as string]: expandMenu,
  [types.MENU_COLLAPSE_MENU as string]: collapseMenu,
};
