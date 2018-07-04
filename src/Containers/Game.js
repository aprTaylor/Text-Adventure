import { connect } from 'react-redux';

import App from '../App';
import { changeRoom, changeDisplay, updateTick } from '../actions/index'; 

const mapStateToProps = state => ({
  exits: state.exits,
  text: state.text,
  world: {tick: state.world.tick},
  display: state.display
});

const mapDispatchToProps = dispatch => ({
  changeRoom: (room) => {
    return dispatch(changeRoom(room));
  },
  changeDisplay: (display) => {
    return dispatch(changeDisplay(display));
  },
  updateTick: (tickChange) => {
    return dispatch(updateTick(tickChange));
  }
});

const Game = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);


export default Game;
