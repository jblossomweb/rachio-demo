import styled from 'styled-components';
import { rem } from 'polished';
import palette from 'app/palette';
import * as constants from './LeftMenu.constants';

export const Wrapper = styled.div`
  .MuiAppBar-colorPrimary {
    background-color: ${palette.BLUE};
  }
  a:hover .MuiListItem-button.Mui-selected,
  .MuiListItem-button.Mui-selected {
    background-color: ${palette.BLUE};
    color: ${palette.WHITE};
  }
  a:hover .MuiListItem-button.Mui-selected .MuiIcon-root,
  .MuiListItem-button.Mui-selected .MuiIcon-root {
    color: ${palette.WHITE};
  }

  .MuiListItem-button {
    color: ${palette.BLACK};
  }

  .MuiToolbar-root {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const LogoWide = styled.img`
  width: ${rem(constants.drawerWidth / 2)};
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RightSide = styled.div`
`;

export const Children = styled.div`
`;
