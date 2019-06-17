import React from 'react';
import ReactAnimationFrame from 'react-animation-frame';
import World from '../../ecs'

const logger = require('logdown')('UI:Updater.js')
 
class Updater extends React.Component {
    onAnimationFrame(time, lastTime) {
        const dt = time - lastTime;
        
        World.update(dt);
    }

    render(){return null}
}
 
export default ReactAnimationFrame(Updater, (process.env.NODE_ENV !== 'production')?1000:100);