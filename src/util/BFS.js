import isA from './isA'
import isEmpty from './isEmpty'
import len from './len'
export default BST = (graph, process, ...params) => {
    //Error check
    if(isEmpty(graph))
        throw Error("BST graph is empty. Graph must be non-empty.");
    if(!isA.func(process))
        throw Error(process + " is not a function. Process for BST must be a function.");
    
    let visited = [];
    let queue = [];
    let keys = Object.keys(graph);
    queue.push(keys[0]);

    while(!queue.length){
        let first = queue.shift();
        process(first, ...params);

        let edges = graph[first];
        let edgeslen = len(edges);
        // Get all adjacent vertices of the dequeued
        // vertex. If an adjacent has not been visited, 
        // then mark it visited and enqueue it
        for (i = 0; i < edgeslen; ++i){
            let atIndex = atIndex(i, edges);
            if (!visited[atIndex]){
                visited.push(atIndex);
                queue.push(atIndex);
            }
        }

    }
}

///