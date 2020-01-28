import * as types from './types';

/*
 * EXPAND_MENU
 */
export const expandMenu: () => types.Interface['EXPAND_MENU'] = () => ({
  type: types.EXPAND_MENU,
});

/*
 * COLLAPSE_MENU
 */
export const collapseMenu: () => types.Interface['COLLAPSE_MENU'] = () => ({
  type: types.COLLAPSE_MENU,
});
