import styled from 'styled-components';
import { rem } from 'polished';
import palette from 'app/palette';

export const Wrapper = styled.div`
  .MuiAlert-root {
    background-color: ${palette.RED};
    width: ${rem(300)};
  }
`;
