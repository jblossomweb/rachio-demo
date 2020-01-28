import { createSelector } from 'reselect';
import { AppState } from 'core/store';
import { Collapsed, defaultCollapsed } from './dataTypes';
import paths from './paths';

/*
 * getCollapsed
 */

const getCollapsedSelector = (
  state: AppState,
): Collapsed => state.get('app').getIn(
  paths.collapsed(),
  defaultCollapsed,
);

export const getCollapsed = createSelector([
  getCollapsedSelector,
], (collapsed: Collapsed) => collapsed);
