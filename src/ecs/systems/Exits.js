import System from './System'
import { setIn as setState } from 'timm'
class ExitSystem extends System {
  update(dt, state) {
    //List exits in state
    const room = this.getCurrRoom();
    const exitsInRoom = this.world.queryTag('exit')
                                  .filter(exit => exit.portal.backwardLink === room)
                                  .map(exit => exit.name.label)
    return setState(state, ["world", "exitNames"], exitsInRoom);
  }

  isTriggered(dt, state){
    return !!state.events.moveTo
  }
}

export default ExitSystem