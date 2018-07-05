import React, {Component} from 'react';
import { TextWindow } from './TextWindow';
//import PropTypes from 'prop-types';

/**
 * 
 * 
 * @export
 * @class Room
 * @extends {Component}
 */
export class Room extends Component {
    constructor(props){
        super(props);
        console.log("ROOM this.props", this.props)
        this.text = this.props.display.start(this.props.world);
    }
    
    componentWillUnmount(){
        this.props.display.end();
    }

    render() {
        this.text = this.props.display.update(this.props.world);
        return (
            <TextWindow text={this.text} />
        )
    }
  }

  //Room.propTypes = {
  //};

  // find child (find_child) => normal state