import styled from 'styled-components';
import { rem } from 'polished';
import palette from 'app/palette';

export const Wrapper = styled.div`
  .MuiSwitch-colorPrimary.Mui-checked {
    color: ${palette.BLUE};
  }
  .MuiCircularProgress-root {
    color: ${palette.BLUE};
  }
`;

export const SubHeader = styled.div`
  display: flex;
  width: 100%;
`;

export const Image = styled.div`
  margin-top: ${rem(24)};
  .MuiCardMedia-root {
    width: ${rem(182)};
    height: ${rem(114)};
  }
`;

export const Status = styled.div`
  .MuiChip-root {
    margin-bottom: ${rem(16)};
  }
`;
