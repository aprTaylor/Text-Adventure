import React from "react";
import { connect } from 'react-redux';
import Actions from "../presentation/Actions";
import { Action } from "../../redux/actions";

const logger = require('logdown')('app:ActionsProvider.js')


class ActionsProvider extends React.Component {
  render() {
    return React.createElement(Actions, this.props);
  }
}

const mapStateToProps = function(state) {
  return {
    actions: state.world.availableActions,
    inventory: state.world.inventory
  }
}

const mapDispatchToProps = dispatch => ({
  handleClick: (action, id) => {
    Action.takeAction(action, [id])
  }
})
  

export default connect(mapStateToProps, mapDispatchToProps)(ActionsProvider);

