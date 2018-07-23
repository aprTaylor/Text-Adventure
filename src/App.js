import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import { Exits } from './components/Exits'
import { TextWindow } from './components/TextWindow'
import { Room } from './components/Room'
import { Actions } from './components/Actions'
import { Map } from './Containers/Map'

import { ACTIONS } from './GameObjects'
import { forceArray } from './util/mis'
class App extends Component {

  constructor(props){
    super(props);
    this.incrementTick = this.incrementTick.bind(this);
    this.addActions = this.addActions.bind(this);
    this.takeTurn = this.takeTurn.bind(this);

    this.actionsMap = {
      [ACTIONS.NEXT]: this.takeTurn
    }
    //this.props.changeRoom(ROOMS.FIELD);
  }



  shouldComponentUpdate(nextProps, nextState){
    if(nextProps === this.props)
      return false;
    return true;
  }



  takeTurn() {
    this.incrementTick();
    this.props.clearActions();
  }

  incrementTick() {
    this.props.updateTick(this.props.world.tick);
  }

  addActions(actions){
    actions = forceArray(actions);
    //Filter duplicate actions
    let newActions = actions.filter((action) => {
      if(this.props.actions.indexOf(action) === -1)
        return true;
      return false;
    });
    if(newActions.length > 0){
      this.props.addActions(this.props.actions, newActions);
    }
  }

  render() {
    return (
      <div className="App">
        <Exits exits={this.props.exits} changeRoom={this.props.changeRoom}/>
        <Room display={this.props.display} world={this.props.world} 
        addActions={this.addActions} actions={this.props.actions}/>
        <Actions actions={this.props.actions} actionMap={this.actionsMap}/>
        <Map />
      </div>
    );
  }
}
/*
App.propTypes = {
  
};
*/
export default App;