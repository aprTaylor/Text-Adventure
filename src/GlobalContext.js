import React, { Component, Children } from 'react'
import World from './ecs/World';
import PropTypes from 'prop-types'

class GlobalProvider extends Component {
    constructor(props){
        super(props);
        this.world = new World();
    }
  // you must specify what you’re adding to the context
  static childContextTypes = {
   world: PropTypes.object.isRequired,
  }
  getChildContext() {
    let world = this.world
    return { world };
  }
  render() {
    // `Children.only` enables us not to add a <div /> for nothing
    return Children.only(this.props.children)
  }
}

export default GlobalProvider