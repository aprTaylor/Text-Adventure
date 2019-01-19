import React from "react";
import styled from 'styled-components';

const Description = props => (
  <Root className="Description">
      <p>{props.description}</p>
  </Root>
)

const Root = styled.div`
    margin-top: 0;
    & p {
        white-space: pre-line;
    }
`

export default Description