import React from 'react';
import forEach from 'lodash/forEach';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { getTestScenes, mountScenes } from 'core/test';
import ErrorAlerts from 'app/components/molecules/ErrorAlerts';
import { scenes } from './LeftMenu.stories';
import * as Style from './LeftMenu.style';
import LeftMenu from './LeftMenu';

const testScenes = getTestScenes(
  mountScenes(scenes),
  LeftMenu,
  component => ({
    styleWrapper: component.find(Style.Wrapper),
    errorAlerts: component.find(ErrorAlerts),
    appBar: component.find(AppBar),
    drawer: component.find(Drawer),
    drawerList: component.find(Drawer).find(List),
    menuIcon: component.find(MenuIcon),
    iconButton: component.find(IconButton),
    expandMenu: component.find(`[aria-label="expand menu"]`).first(),
    collapseMenu: component.find(`[aria-label="collapse menu"]`).first(),
    refreshData: component.find(`[aria-label="refresh data"]`).first(),
}));

describe('templates/LeftMenu', () => {
  it(`always mounts the LeftMenu component`, () => {
    forEach(testScenes, scene => {
      expect(scene.component.length).toBe(1);
    });
  });

  it(`always mounts the Style.Wrapper component`, () => {
    forEach(testScenes, scene => {
      const { styleWrapper } = scene.elements;
      expect(styleWrapper.length).toBe(1);
    });
  });

  it(`mounts the ErrorAlerts component if there are errors`, () => {
    forEach(testScenes, scene => {
      if (scene.props.errors?.length) {
        const { errorAlerts } = scene.elements;
        expect(errorAlerts.length).toBe(1);
      }
    });
  });

  it(`does not mount the ErrorAlerts component if there are no errors`, () => {
    forEach(testScenes, scene => {
      if (!scene.props.errors?.length) {
        const { errorAlerts } = scene.elements;
        expect(errorAlerts.length).toBe(0);
      }
    });
  });

  it(`always mounts the AppBar component`, () => {
    forEach(testScenes, scene => {
      const { appBar } = scene.elements;
      expect(appBar.length).toBe(1);
    });
  });

  it(`always mounts the Drawer component`, () => {
    forEach(testScenes, scene => {
      const { drawer } = scene.elements;
      expect(drawer.length).toBe(1);
    });
  });

  it(`always mounts the correct number of ListItems in Drawer menu`, () => {
    forEach(testScenes, scene => {
      const { drawerList } = scene.elements;
      const { menu } = scene.props;
      const listItems = drawerList.find(ListItem);
      expect(listItems.length).toBe(menu.length);
    });
  });

  it(`always mounts the MenuIcon component`, () => {
    forEach(testScenes, scene => {
      const { menuIcon } = scene.elements;
      expect(menuIcon.length).toBe(1);
    });
  });

  it(`always mounts an element with aria-label="expand menu"`, () => {
    forEach(testScenes, scene => {
      const { expandMenu } = scene.elements;
      expect(expandMenu.length).toBe(1);
    });
  });

  it(`always mounts an element with aria-label="collapse menu"`, () => {
    forEach(testScenes, scene => {
      const { collapseMenu } = scene.elements;
      expect(collapseMenu.length).toBe(1);
    });
  });

  it(`always mounts an element with aria-label="refresh data"`, () => {
    forEach(testScenes, scene => {
      const { refreshData } = scene.elements;
      expect(refreshData.length).toBe(1);
    });
  });

  it(`calls props.expandMenu on expand menu click if menu is collapsed`, () => {
    forEach(testScenes, scene => {
      const { menuCollapsed } = scene.props;
      if (menuCollapsed) {
        const expandMenu = jest.fn();
        const spy = () => (
          <LeftMenu
            {...scene.props}
            expandMenu={expandMenu}
          />
        );
        const scenes = getTestScenes(
          mountScenes({ spy }),
          LeftMenu,
          component => ({
            expandMenu: component.find(`[aria-label="expand menu"]`).first(),
        }));
        const trigger = scenes.spy.elements.expandMenu;
        expect(expandMenu).not.toHaveBeenCalled();
        trigger.simulate('click');
        expect(expandMenu).toHaveBeenCalled();
      }
    });
  });

  it(`calls props.collapseMenu on collapse menu click if menu is not collapsed`, () => {
    forEach(testScenes, scene => {
      const { menuCollapsed } = scene.props;
      if (!menuCollapsed) {
        const collapseMenu = jest.fn();
        const spy = () => (
          <LeftMenu
            {...scene.props}
            collapseMenu={collapseMenu}
          />
        );
        const scenes = getTestScenes(
          mountScenes({ spy }),
          LeftMenu,
          component => ({
            collapseMenu: component.find(`[aria-label="collapse menu"]`).first(),
        }));
        const trigger = scenes.spy.elements.collapseMenu;
        expect(collapseMenu).not.toHaveBeenCalled();
        trigger.simulate('click');
        expect(collapseMenu).toHaveBeenCalled();
      }
    });
  });

  it(`calls props.refreshData on refresh data click`, () => {
    forEach(testScenes, scene => {
      const refreshData = jest.fn();
      const spy = () => (
        <LeftMenu
          {...scene.props}
          refreshData={refreshData}
        />
      );
      const scenes = getTestScenes(
        mountScenes({ spy }),
        LeftMenu,
        component => ({
          refreshData: component.find(`[aria-label="refresh data"]`).first(),
      }));
      const trigger = scenes.spy.elements.refreshData;
      expect(refreshData).not.toHaveBeenCalled();
      trigger.simulate('click');
      expect(refreshData).toHaveBeenCalled();
    });
  });
});
