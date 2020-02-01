import styled from 'styled-components';
import { rem } from 'polished';
import palette from 'app/palette';

export const Wrapper = styled.div`
  .MuiSwitch-colorPrimary.Mui-checked {
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

export const MinutesInput = styled.span`
  .MuiInput-root {
    margin-top: ${rem(-3)};
  }
`;

export const RunButton = styled.span`
  .MuiButton-root:hover {
    background-color: ${palette.BLUE};
    color: ${palette.WHITE}
  }
`;

export const CancelButton = styled.span`
  .MuiButton-root:hover {
  }
`;
