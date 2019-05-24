import System from './System'
import { setIn as setState } from 'timm'
import World from '..';

function ExitSystem (pool, dt)  {
  //List exits in state
  const room = this.getCurrRoom();
  const exitsInRoom = this.world.queryTag('exit')
                                .filter(exit => exit.portal.backwardLink === room)
                                .map(exit => exit.name.label)
  
  World.IO.updateWorld("exitName", exitsInRoom);
}

export default ExitSystem