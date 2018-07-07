import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { ACTIONS } from '../GameObjects'

export class Actions extends Component {
    render(){
        return (
            <div className="Actions">
              <ul>
                  {this.props.actions.map((action, index) => {
                      return (<li key={index}>
                            <button onClick={this.props.actionMap[action]}>
                                {ACTIONS[action]} 
                            </button>
                        </li>);
                  })}
              </ul>
            </div>
          );
    }
}

Actions.propTypes = {
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            dispatch: PropTypes.func
        })
    ).isRequired
}