export const MENU_EXPAND_MENU = 'MENU_EXPAND_MENU';
export const MENU_COLLAPSE_MENU = 'MENU_COLLAPSE_MENU';

export interface Interface {
  [MENU_EXPAND_MENU]: {
    type: 'MENU_EXPAND_MENU',
  },
  [MENU_COLLAPSE_MENU]: {
    type: 'MENU_COLLAPSE_MENU',
  },
};
