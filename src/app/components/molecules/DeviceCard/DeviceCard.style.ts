import styled from 'styled-components';
import { rem } from 'polished';
import palette from 'app/palette';

export const Wrapper = styled.div`
  .MuiSwitch-colorPrimary.Mui-checked {
    color: ${palette.BLUE};
  }
  .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track {
    background-color: ${palette.BLUE};
  }
  .MuiSwitch-root {
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

export const Icon = styled.p`
  .MuiIcon-root {
    font-size: ${rem(12)};
  }
`;

export const GreenCheck = styled(Icon)`
  .MuiIcon-root {
    color: ${palette.GREEN};
    font-weight: bold;
  }
`;

export const Status = styled.div`
  margin-top: ${rem(-8)};
  .MuiChip-root.blue {
    background-color: ${palette.BLUE};
  }
  .MuiChip-root.red {
    background-color: ${palette.RED};
  }
  .MuiChip-root.green {
    background-color: ${palette.GREEN};
  }
  .MuiChip-root.gray {
    background-color: ${palette.GRAY};
  }
`;
