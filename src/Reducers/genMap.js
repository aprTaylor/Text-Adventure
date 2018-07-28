import { GENERATE_MAP } from '../actions'
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
  let currX = 0;
  let currY = 0;
  let prevRoom = null;
  const lineLng = 100;
    
    let results = BFS(EXITS, (room, edges) => {
      console.log("edges", edges)
      //Set position of room node
      if(prevRoom){
        let dir = getDir(prevRoom, room);
        console.log("room", room, "prevRoom", prevRoom, "dir", dir);
        switch(dir){
          case "E": currX -= lineLng; break;
          case "W": currX += lineLng; break;
          case "N": currY += lineLng; break;
          case "S": currY -= lineLng; break;
        }
      }
      prevRoom = room;

      let node = {id: room, label: room, x: currX, y: currY, fixed: true};

      nodes.push(node);
    });

    console.log("Gen map", "nodes", nodes, "edges", results.edges, "exits", EXITS)
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