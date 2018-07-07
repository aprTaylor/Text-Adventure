import { connect } from 'react-redux';

import App from '../App';
import * as actions  from '../actions/index'; 
import { addActions } from '../actions/index'

const mapStateToProps = state => ({
  exits: state.exits,
  world: {tick: state.world.tick},
  display: state.display,
  actions: state.actions
});

const mapDispatchToProps = dispatch => ({
  changeRoom: (room) => {
    return dispatch(actions.changeRoom(room));
  },
  changeDisplay: (display) => {
    return dispatch(actions.changeDisplay(display));
  },
  updateTick: (tickChange) => {
    return dispatch(actions.updateTick(tickChange));
  },
  addActions: (actions, actionsMap, newActions) => {
    return dispatch(addActions(actions, actionsMap, newActions));
  },
  clearActions: () => {
    return dispatch(actions.clearActions());
  }
});

const Game = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);


export default Game;
