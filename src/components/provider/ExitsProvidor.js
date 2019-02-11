import React from "react";
import Exits from "../presentation/Exits";
import { connect } from 'react-redux';
import { Action } from '../../redux/actions'

class ExitsProvidor extends React.Component {
    render() {
        return React.createElement(Exits, this.props);
    }
}

const mapStateToProps = function(state) {
    return {
      exits: state.world.exitNames
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        handleClick: (exit) => {
            Action.exitToRoom(exit)
        }
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(ExitsProvidor);

