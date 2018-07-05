import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import { Exits } from './components/Exits'
import { TextWindow } from './components/TextWindow'
import { Room } from './components/Room'
import { ROOMS } from './GameObjects'
class App extends Component {

  constructor(props){
    super(props);
    this.incrementTick = this.incrementTick.bind(this);
    //this.props.changeRoom(ROOMS.FIELD);
  }

  incrementTick() {
    this.props.updateTick(this.props.world.tick);
  }

  render() {
    return (
      <div className="App">
        <Exits exits={this.props.exits} />
        <Room display={this.props.display} world={this.props.world}/>
        <button onClick={this.incrementTick}>incrementTick</button>
      </div>
    );
  }
}
/*
App.propTypes = {
  
};
*/
export default App;