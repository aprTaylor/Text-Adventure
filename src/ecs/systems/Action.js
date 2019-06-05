import System from './System'
import World from '..';
import Entity from '../engine/Entity';

const logger = require('logdown')('app:ActionSystem.js')


function ActionSystem (pool, dt) {

  const currRoom = System.getCurrRoom();

  //Take queued actions
  let actions = World.IO.getState().events.actions;
  if(actions.take) {
    actions.take.forEach(item => {
      take(item);
    });
  }

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

const take = (itemId) => {
  //Remove from world and move into player inventory
  World.Entity.removeComponent("presence", itemId);
  logger.info("presence", World.Entity.get(itemId))
  World.Entity.getFirstFromTag("player").inventory.list.push(itemId);
}

export default ActionSystem 