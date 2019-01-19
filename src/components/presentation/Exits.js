import React from "react";
import styled from 'styled-components'

const Exits = props => (
  <Root className="Exits">
    {props.exits.map((name, index) => {
        return <li key={ index } onClick={props.handleClick.bind(this,name)}>{name}</li>;
    })}
  </Root>
)

const Root = styled.ul`
  margin-top: 0;
`

export default Exits