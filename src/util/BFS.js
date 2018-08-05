import {isA, len, isEmpty, atIndex} from './TypeProof';
const MAX_REC = 100;
const BFS = (graph, process, ...params) => {
    //Error check
    if(isEmpty(graph))
        throw Error("BST graph is empty. Graph must be non-empty.");
    
    let visited = [];
    let queue = [];
    let keys = Object.keys(graph);
    let cnt = 0;

    let edges = [];
    let vertices = [];
    let prev = null;
    queue.push(keys[0]);
    visited[keys[0]] = {parent: null};

    while(queue.length > 0){
        //Make sure we do not recurse too far
        if(cnt >= MAX_REC)
            throw Error("BFS exceeded max recurion level. Max recursion is currently set to "+MAX_REC);
        cnt++;

        let first = queue.shift();
        let nodeEdges = graph[first];
        let edgeslen = len(nodeEdges);

        vertices.push(first);

        if(isA.func(process))
            process(first, visited[first].parent, nodeEdges, ...params);


        // Get all adjacent vertices of the dequeued
        // vertex. If an adjacent has not been visited, 
        // then mark it visited and enqueue it
        for (let i = 0; i < edgeslen; ++i){
            let index = atIndex(i, nodeEdges);
            if (!visited.hasOwnProperty(index)){
                visited[index] = {parent: first};
                queue.push(index);
                edges.push({from: first, to: index});
            }
        }
    }
    return {vertices: vertices, edges: edges};

}

export default BFS;

///