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
    console.log("I am in constructor", this.props);
    //this.props.changeRoom(ROOMS.LAVENDER_FIELD);
    console.log("After change room is called", this.props);
  }

  incrementTick() {
    this.props.updateTick(this.props.world.tick);
  }

  render() {
    console.log("APP this.props", this.props);
    return (
      <div className="App">
        <Exits exits={this.props.exits} />
        <Room display={this.props.display} world={this.props.world}/>
      </div>
    );
  }
}
/*
App.propTypes = {
  
};
*/
export default App;