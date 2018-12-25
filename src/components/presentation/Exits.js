import React from "react";

const Exits = props => (
  <ul className="Exits">
    {props.exits.map((name, index) => {
        return <li key={ index } onClick={() => props.handleClick(name)}>{name}</li>;
    })}
  </ul>
)

export default Exits