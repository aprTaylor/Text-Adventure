import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Exits extends Component {

  shouldComponentUpdate(nextProps){
    if(nextProps.exits !== this.props.exits)
      return true;
  }

    render() {
      return (
        <div className="Exits">
          <ul>
              {this.props.exits.map((exit, index) => {
                  return (
                  <li key={index} onClick={this.props.changeRoom.bind(this, exit)}>
                    {exit}
                  </li>);
              })}
          </ul>
        </div>
      );
    }
  }

  Exits.propTypes = {
    exits: PropTypes.arrayOf(PropTypes.string)
  };