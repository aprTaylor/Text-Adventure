import isA from 'typeproof/core/isA'
import World from '..'
import System from './System'

function PlayerSystem (pool, dt) {
    const player = World.Entity.getFirstFromTag('player');
    
    if(isA.string(player.presence.room)){
        System.moveTo(player, player.presence.room)      
    }
}

export default PlayerSystem