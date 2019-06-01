import React from "react";
import { connect } from 'react-redux';
import Actions from "../presentation/Actions";

const logger = require('logdown')('app:ActionsProvider.js')


const modes = ({
  ACTION_BOARD: Symbol("ActionBoard"),
  INTERACT_BOARD: Symbol("InteractBoard")
})

class ActionsProvider extends React.Component {
  state = ({
    mode: modes.ACTION_BOARD,
    interactItems: []
  })

  openInteractBoard = (items) => {
    logger.info("interactions", "open action", items)
    this.setState({
      mode: modes.INTERACT_BOARD,
      interactItems: items
    })
  }

  closeInteractBoard = () => {
    this.setState({
      mode: modes.ACTION_BOARD,
      interactItems: []
    })
  }

  render() {
    return React.createElement(
      getElement(this.state.mode), 
      { ...this.props, 
        items: this.state.interactItems,
        openInteractBoard: this.openInteractBoard, 
        closeInteractBoard: this.closeInteractBoard
      });
  }
}

const getElement = mode => {
  switch(mode) {
    case modes.ACTION_BOARD: return Actions
    //case modes.INTERACT_BOARD: return Interactions
  }
}

const mapStateToProps = function(state) {
  return {
    actions: state.world.availableActions
  }
}

const mapDispatchToProps = dispatch => ({
})
  

export default connect(mapStateToProps, mapDispatchToProps)(ActionsProvider);

