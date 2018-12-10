// CommentListContainer.js
import React from "react";
import DisplayWindow from "../presentation/DisplayWindow";

class DisplayWindowProvidor extends React.Component {
  constructor() {
    super();
    this.state = { comments: [] }
  }
  
  render() {
    return React.createElement(DisplayWindow);
  }
}

export default DisplayWindowProvidor

