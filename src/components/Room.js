import React, {Component} from 'react';
import { TextWindow } from './TextWindow';
import PropTypes from 'prop-types';

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
        this.text = this.props.display.start(this.props.world);
    }

   // shouldComponentUpdate(nextProps, nextState){
   //     console.log("Room", nextProps.actions.length )
   //     if(nextProps.actions.length > 0)
   //         return true;
   // }
    
    componentWillUnmount(){
        this.props.display.stop();
    }

    render() {
        this.text = this.props.display.update(this.props.world);
        
        let actions = this.props.display.getActions();
        if(actions)
            this.props.addActions(actions);

        return (
            <div id={ this.props.id } className={ this.props.className }>
                <TextWindow text={this.text} />
            </div>
        )
    }
  }

  Room.propTypes = {
      addActions: PropTypes.func.isRequired,
      display: PropTypes.object.isRequired
  };

  // find child (find_child) => normal state