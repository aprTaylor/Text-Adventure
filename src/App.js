import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import { Exits } from './components/Exits'
import { TextWindow } from './components/TextWindow'
import { Room } from './components/Room'

class App extends Component {

  constructor(){
    super();
    this.incrementTick = this.incrementTick.bind(this);
  }

  incrementTick() {
    this.props.updateTick(this.props.world.tick);
    console.log(this.props);
  }

  render() {
    const {exits, text, world} = this.props;
    return (
      <div className="App">
        <Exits {...{exits}} />
        <button onClick={this.incrementTick}>incrementTick</button>
        <Room {...{world}}/>
        <TextWindow {...{text}}/>
      </div>
    );
  }
}
/*
App.propTypes = {
  
};
*/
export default App;