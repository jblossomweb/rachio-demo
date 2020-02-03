import React from 'react';
import Window from 'window-or-global';

import { KnobsInterface, storyBuilder } from 'core/stories';
import mockErrors from 'app/__mocks__/errors.json';

import LeftMenu, { Props } from './LeftMenu';
import { menu } from 'app/routes';

export const mockProps: Props = {
  title: 'Page Title',
  menu,
  currentPath: menu[0].path,
  collapseMenu: () => {
    Window.console.log(`collapseMenu()`);
  },
  expandMenu: () => {
    Window.console.log(`expandMenu()`);
  },
  dismissError: key => {
    Window.console.log(`dismissError(${key})`);
  },
  refreshData: () => {
    Window.console.log(`refreshData()`);
  },
};

export const renderScene = (
  knobProps: Props,
) => (
  knobs: KnobsInterface,
  props: Props = knobProps,
) => (
  <LeftMenu
    title={knobs.text('title', props.title || '')}
    menuCollapsed={knobs.boolean('menuCollapsed', !!props.menuCollapsed)}
    menu={knobs.object('menu', props.menu)}
    currentPath={knobs.text('currentPath', props.currentPath)}
    errors={knobs.object('errors', props.errors)}
    collapseMenu={mockProps.collapseMenu}
    expandMenu={mockProps.expandMenu}
    dismissError={mockProps.dismissError}
    refreshData={mockProps.refreshData}
  >
    {knobs.text('children', 'Page Content')}
  </LeftMenu>
);

export const scenes = {
  'sample': renderScene({
    ...mockProps,
  }),
  'menu collapsed': renderScene({
    ...mockProps,
    menuCollapsed: true,
  }),
  'no title': renderScene({
    ...mockProps,
    title: undefined,
  }),
  'current path': renderScene({
    ...mockProps,
    currentPath: menu[1].path,
  }),
  'error': renderScene({
    ...mockProps,
    errors: [mockErrors.errors[0]],
  }),
  'errors': renderScene({
    ...mockProps,
    errors: mockErrors.errors,
  }),
};

storyBuilder(
  scenes,
  'templates/LeftMenu',
);
