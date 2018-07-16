import { GENERATE_MAP } from '../actions'
const genMap = (state, action) => {

    if (action.type !== GENERATE_MAP) return state;

    var nodes = [
        {id: 1, label: 'Fixed node', x:0, y:0, fixed:true},
        {id: 2, label: 'Drag me', x:0, y:130, physics:false},
        {id: 3, label: 'Obstacle', x:80, y:-80, fixed:true, mass:10}
      ];
      // create an array with edges
      var edges = [
        {from: 1, to: 2, arrows:'to'}
      ];
      var data = {
        nodes: nodes,
        edges: edges
      };
      console.log("Map generated", data);
    return {
        ...state,
        mapData: data
    };
};

export default genMap;