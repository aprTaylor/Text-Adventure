import React from "react";
import Exits from "../presentation/Exits";
import { connect } from 'react-redux';
import { Action } from '../../redux/actions'

const logger = require('logdown')('UI:ExitsProvider.js')

class ExitsProvider extends React.Component {
    render() {
        return React.createElement(Exits, this.props);
    }
}

const mapStateToProps = function(state) {
    return {
      exits: state.world.exitNames,
      moveTo: name => Action.exitToRoom(name)
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        handleClick: (exit) => {
            Action.exitToRoom(exit)
        }
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(ExitsProvider);

