import { connect } from 'react-redux';

import ExitsComp from '../components/Exits';
import { EXITS } from '../GameObjects'; 

const mapStateToProps = state => ({
  exits: state.exits
});

const mapDispatchToProps = dispatch => ({
  changeRoom: (room) => {
    let roomExits = EXITS[room];
    dispatch(Object.keys(roomExits).reduce((exits, dir) => {
        return exits.push(roomExits[dir]);
    }, []));
  }
});

const Exits = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExitsComp);

export default Exits;