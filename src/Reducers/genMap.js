import { GENERATE_MAP } from '../actions/names'
import { EXITS } from '../GameObjects'
import BFS from '../util/BFS'
const genMap = (state, action) => {

    if (action.type !== GENERATE_MAP) return state;

        let data = genData();
      
    return {
        ...state,
        mapData: data
    };
};

const getDir = (prevRoom, currRoom) => {
  let exits = EXITS[prevRoom];
  for(let exit in exits){
    if(exits[exit] === currRoom){
      return exit;
    }
  }
}

const genData = () => {
  let nodes = [];
  let edges = [];
  let x = 0;
  let y = 0;
  let roomCoords = {};
  const lineLng = 100;
    
    let results = BFS(EXITS, (room, parent, edges) => {
      //Set position of room node
      if(parent){
        let dir = getDir(parent, room);
        if(roomCoords.hasOwnProperty(parent))
          x = roomCoords[parent].x;
          y = roomCoords[parent].y;

          if(dir.includes("E"))
            x -= lineLng;
          else if(dir.includes("W"))
            x += lineLng;
          if(dir.includes("N"))
            y -= lineLng;
          else if(dir.includes("S"))
            y += lineLng;

      }
      roomCoords[room] = {x: x, y: y};
      let node = {id: room, label: room, x: x, y: y, fixed: true};

      nodes.push(node);
    });
    /*
    var nodes = [
        {id: 1, label: 'Fixed node', x:0, y:0, fixed:true},
        {id: 2, label: 'Drag me', x:0, y:130, physics:false},
        {id: 3, label: 'Obstacle', x:80, y:-80, fixed:true, mass:10}
      ];
      // create an array with edges
      var edges = [
        {from: 1, to: 2, arrows:'to'}
      ];*/

      return {
        nodes: nodes,
        edges: results.edges
      };

}

export default genMap;