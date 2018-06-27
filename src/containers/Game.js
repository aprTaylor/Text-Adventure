import { connect } from 'react-redux';

import App from '../App';
import { changeRoom, updateTick } from '../actions/index'; 

const mapStateToProps = state => ({
  exits: state.exits,
  text: state.text,
  world: {tick: state.world.tick},
});

const mapDispatchToProps = dispatch => ({
  changeRoom: (room) => {
    return dispatch(changeRoom(room));
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
