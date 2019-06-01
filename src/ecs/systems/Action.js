import System from './System'
import World from '..';
import Entity from '../engine/Entity';

const logger = require('logdown')('app:ActionSystem.js')


function ActionSystem (pool, dt) {

  const currRoom = System.getCurrRoom();

  //Add takable to actions
  let items = World.Entity.queryComponents(["takeable", "presence"])
                          .map(entity => World.Entity.get(entity))
                          .filter(entity => currRoom.id === entity.presence.room);


  World.IO.updateWorld(["availableActions", "take"], 
    items.map(entity => {
      const {id, name} = entity; 
      return ({
        id, name: name.label, 
        description: System.load(entity, 'description'),
      })
    })
  );

  logger.info("items", World.IO.getState())
        
}

export default ActionSystem 