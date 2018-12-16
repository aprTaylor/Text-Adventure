import React from react;
import ReactAnimationFrame from 'react-animation-frame';
import { connect } from 'react-redux';
import { update } from '../../redux/actions'
 
class Updater extends React.Component {
    onAnimationFrame(time, lastTime) {
        const dt = time - lastTime;
         this.props.update(dt);
    }
}
 
export default connect({}, { update })( ReactAnimationFrame(Updater));