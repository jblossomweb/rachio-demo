import * as types from './types';

/*
 * MENU_EXPAND_MENU
 */
export const expandMenu: () => types.Interface['MENU_EXPAND_MENU'] = () => ({
  type: types.MENU_EXPAND_MENU,
});

/*
 * MENU_COLLAPSE_MENU
 */
export const collapseMenu: () => types.Interface['MENU_COLLAPSE_MENU'] = () => ({
  type: types.MENU_COLLAPSE_MENU,
});
