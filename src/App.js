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
    console.log(this.props);
    this.props.changeRoom(ROOMS.LAVENDER_FIELD);
  }

  incrementTick() {
    this.props.updateTick(this.props.world.tick);
  }

  render() {
    const {exits, world} = this.props;
    return (
      <div className="App">
        <Exits {...{exits}} />
        <Room {...{world}}/>
      </div>
    );
  }
}
/*
App.propTypes = {
  
};
*/
export default App;