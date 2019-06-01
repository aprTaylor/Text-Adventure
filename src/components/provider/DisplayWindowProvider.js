import React from "react";
import DisplayWindow from "../presentation/DisplayWindow";
import { getDesc } from '../../redux/actions'
import { connect } from 'react-redux';
import Description from "../presentation/Description";
import Exits from "../presentation/Exits";
import Actions from "../presentation/Actions";
import { Action } from '../../redux/actions'

const logger = require('logdown')('app:DisplayWindowProvider.js')

class DisplayWindowProvider extends React.Component {
    render() {
      const {exits, moveTo, actions, desc} = this.props;
        return React.createElement(DisplayWindow, null, 
            <Exits exits={exits} moveTo={moveTo}/>,
            <Description description={desc}/>,
            <Actions actions={actions}/>
        );
    }
}

const mapStateToProps = function(state) {
  return {
    desc: state.world.description,
    exits: state.world.exitNames,
    actions: state.world.availableActions
  }
}

const mapDispatchToProps = dispatch => ({
  moveTo: (name) => Action.exitToRoom(name)
})
  

export default connect(mapStateToProps, mapDispatchToProps)(DisplayWindowProvider);

