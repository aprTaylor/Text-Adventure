import React from "react";
import styled from 'styled-components';
import SanitizeHTML from '../utils/SanitizeHTML'


const Description = props => (
  <Root className="Description">
      <SanitizeHTML html={props.description}/>
  </Root>
)

const Root = styled.div`
    margin: 20px;
    & p {
        white-space: pre-line;
    }
`

export default Description