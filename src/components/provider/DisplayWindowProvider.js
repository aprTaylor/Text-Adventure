import React from "react";
import DisplayWindow from "../presentation/DisplayWindow";
import { getDesc } from '../../redux/actions'
import { connect } from 'react-redux';
import Description from "../presentation/Description";
import ExitsProvider from "./ExitsProvider";

const logger = require('logdown')('app:DisplayWindowProvider.js')

class DisplayWindowProvider extends React.Component {
    render() {
      logger.info("Props", this.props)
        return React.createElement(DisplayWindow, null, 
            <ExitsProvider />,
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

