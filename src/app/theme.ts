import styled from 'styled-components';

import palette from 'app/palette';

const Theme = styled.div`
  a {
    cursor: pointer;
    color: ${palette.BLACK};
    text-decoration: none;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: inline;
    margin: 0;
    padding: 0;
  }

  a:hover,
  .anchor:hover {
    color: ${palette.GRAY};
  }
`;

export default Theme;
