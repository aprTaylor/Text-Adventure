import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class TextWindow extends Component {

    render() {
      return (
        <div className="TextWindow" 
        dangerouslySetInnerHTML={{__html: this.props.text}}>
           
        </div>
      );
    }y
  }

  TextWindow.propTypes = {
    text: PropTypes.string
  };