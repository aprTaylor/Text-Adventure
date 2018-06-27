import React, {Component} from 'react';
//import PropTypes from 'prop-types';

export class Room extends Component {
    componentDidMount () {
        //this.startClock()
    }
    
    componentWillUnmount () {
        //this.stopClock()
    }

    render() {
        return (
            <p>{this.props.world.tick}</p>
        )
    }
  }

  //Room.propTypes = {
  //};