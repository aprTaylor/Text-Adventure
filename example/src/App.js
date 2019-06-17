import React, { Component } from 'react'

import TextAdventure from 'react-text-adventure';

require("./systems")

export default class App extends Component {
  render () {
    return (
        <TextAdventure>
            <div>Hello</div>
        </TextAdventure>
    )
  }
}
