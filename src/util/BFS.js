import {isA, len, isEmpty, atIndex} from './TypeProof';
const MAX_REC = 100;
const BFS = (graph, process, ...params) => {
    //Error check
    if(isEmpty(graph))
        throw Error("BST graph is empty. Graph must be non-empty.");
    if(!isA.func(process))
        throw Error(process + " is not a function. Process for BST must be a function.");
    
    let visited = [];
    let queue = [];
    let keys = Object.keys(graph);
    let cnt = 0;

    let edges = [];
    let vertices = [];
    queue.push(keys[0]);
    visited.push(keys[0]);

    while(queue.length > 0){
        //Make sure we do not recurse too far
        if(cnt >= MAX_REC)
            throw Error("BFS exceeded max recurion level. Max recursion is currently set to "+MAX_REC);
        cnt++;

        let first = queue.shift();
        let nodeEdges = graph[first];
        let edgeslen = len(graph[first]);

        vertices.push(first);

        process(first, edges, ...params);

        // Get all adjacent vertices of the dequeued
        // vertex. If an adjacent has not been visited, 
        // then mark it visited and enqueue it
        for (let i = 0; i < edgeslen; ++i){
            let index = atIndex(i, nodeEdges);
            if (visited.indexOf(index) === -1){
                visited.push(index);
                queue.push(index);
                edges.push({vert1: first, vert2: index});
            }
        }
    }
    return {vertices: vertices, edges: edges};

}

export default BFS;

///