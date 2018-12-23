// CommentListContainer.js
import React from "react";
import DisplayWindow from "../presentation/DisplayWindow";
import { getDesc } from '../../redux/actions'
import { connect } from 'react-redux';

class DisplayWindowProvider extends React.Component {
    constructor() {
        super();

        this.state = {
        }
    }
    /**
     * 
     *shouldComponentUpdate(nextProps, nextState) {
    if (this.props.number === nextProps.number) {
      return false;
    } else {
      return true;
    }
  }
     */

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.desc)
        if(prevState.description!== this.props.desc){
            this.setState({description: this.props.desc});
        }
    }
  
    render() {
        console.log("I AM RENDER")
        return React.createElement(DisplayWindow, this.state);
    }
}

const mapStateToProps = function(state) {
    return {
      desc: state.ecs.world.description
    }
  }
  

export default connect(mapStateToProps)(DisplayWindowProvider);

