import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class TextWindow extends Component {

    render() {
      return (
        <div className="TextWindow">
           {this.props.text} 
        </div>
      );
    }
  }

  TextWindow.propTypes = {
    text: PropTypes.string
  };