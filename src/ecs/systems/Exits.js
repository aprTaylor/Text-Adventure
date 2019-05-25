import System from './System'
import { setIn as setState } from 'timm'
import World from '..';

const logger = require('logdown')('app:ExitSystem.js')

function ExitSystem (pool, dt)  {
  //List exits in state
  const room = System.getCurrRoom();
  const exitsInRoom = World.Entity.byTagGet('exit')
                                  .filter(exit => exit.portal.backwardLink === room.id)
                                  .map(exit => exit.name.label)
  World.IO.updateWorld("exitNames", exitsInRoom);
}

export default ExitSystem