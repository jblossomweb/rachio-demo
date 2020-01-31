import styled from 'styled-components';
import { rem } from 'polished';
import palette from 'app/palette';

export const Wrapper = styled.div`
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
