import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import config from 'app/config';
import { MenuRoute } from 'app/routes';
import * as AppTypes from 'app/types';

import ErrorAlerts from 'app/components/molecules/ErrorAlerts';

import * as Hooks from './LeftMenu.hooks';
import * as Style from './LeftMenu.style';

const logoWide: string = `${config.publicUrl}/logo-wide.svg`;

export interface OwnProps {
  title?: string,
}

export interface StateProps {
  menu: MenuRoute[],
  menuCollapsed?: boolean,
  currentPath: MenuRoute['path'],
  errors?: AppTypes.Error[] | any[],
};

export interface DispatchProps {
  collapseMenu: () => void,
  expandMenu: () => void,
  dismissError: (key: number) => void,
  refreshData: () => void,
}

export type Props = OwnProps & StateProps & DispatchProps;

export const LeftMenu: React.FC<Props> = ({
  title,
  menu,
  menuCollapsed,
  collapseMenu,
  expandMenu,
  dismissError,
  refreshData,
  currentPath,
  errors,
  children,
}) => {
  const classes = Hooks.useStyles();
  const open = !menuCollapsed;

  const handleDrawerOpen = () => {
    expandMenu();
  };

  const handleDrawerClose = () => {
    collapseMenu();
  };

  const handleRefresh = () => {
    refreshData();
  };

  return (
    <Style.Wrapper className={classes.root}>
      <CssBaseline />
      {errors?.length ? (
        <ErrorAlerts
          errors={errors}
          dismissError={dismissError}
        />
      ) : null}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Style.LeftSide>
            <IconButton
              color="inherit"
              aria-label="expand menu"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {title}
            </Typography>
          </Style.LeftSide>
          <Style.RightSide>
          <Button
            variant="contained"
            startIcon={<Icon>refresh</Icon>}
            aria-label="refresh data"
            onClick={handleRefresh}
          >
            Refresh
          </Button>
          </Style.RightSide>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Link to={`/`}>
            <Style.LogoWide src={logoWide} />
          </Link>
          <IconButton
            aria-label="collapse menu"
            onClick={handleDrawerClose}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {menu.map((
            route: MenuRoute,
          ) => (
            <Link key={route.path} to={route.path}>
              <ListItem
                key={route.path}
                button
                selected={currentPath === route.path}
              >
                <ListItemIcon>
                  <Icon>{route.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={route.title} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Style.Children>
          {children}
        </Style.Children>
      </main>
    </Style.Wrapper>
  );
};

export default LeftMenu;
