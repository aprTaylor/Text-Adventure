import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Exits extends Component {

    render() {
      return (
        <div className="Exits">
          <ul>
              {this.props.exits.map((exit, index) => {
                  return (<li key={index}>{exit}</li>);
              })}
          </ul>
        </div>
      );
    }
  }

  Exits.propTypes = {
    exits: PropTypes.arrayOf(PropTypes.string)
  };