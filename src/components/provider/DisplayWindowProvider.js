import React from "react";
import DisplayWindow from "../presentation/DisplayWindow";
import { getDesc } from '../../redux/actions'
import { connect } from 'react-redux';
import Description from "../presentation/Description";
import ExitsProvidor from "./ExitsProvidor";

class DisplayWindowProvider extends React.Component {
    render() {
        return React.createElement(DisplayWindow, null, 
            <ExitsProvidor />,
            <Description description={this.props.desc}/>,
        );
    }
}

const mapStateToProps = function(state) {
    return {
      desc: state.world.description
    }
  }
  

export default connect(mapStateToProps)(DisplayWindowProvider);

