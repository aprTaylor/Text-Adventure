import React from "react";
import styled from 'styled-components'

const logger = require('logdown')('UI:Exits.js')

const Exits = props => (
  <Root className="Exits">
    {props.exits.map((name, index) => {
        return <li key={ index } onClick={props.moveTo.bind(this,name)}>{name}</li>;
    })}
  </Root>
)

const Root = styled.ul`
  margin-top: 0;
  & li {
    cursor: pointer;
  }
`

export default Exits