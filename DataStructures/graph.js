/*
    - Directed just means the relationship is not bi-directional
    - List
        - Way to describe a graph
        - Bulleted list where left side is node and right side is nodes it is connected to
            - Left side would be key and right side would be value in object
        - Undirected because does not have directions of connections in edge data
        - Connection A->B means both that B has a connection to A and A has a connection to B
    - Matrix
        - Matrix/grid of numbers where numbers are edges. Nested array has same amount of elements as outer array
        - Each row has same number of elements as rows in the graph
            adjMat = [
                [0, 1, 1],
                [1, 0, 0],
                [1, 0, 0]
            ];
        - Edge can have weight instead of just binary 1,0
        - Good for node-node relationships, like shortest path
    - Incidence
        - Two different classes of object between dimensions
        - Rows are nodes and columns are edges, allows for uneven # of rows/columns
        - Directed graph would use -1 for edge leaving node and 1 for edge entering node
        - Helpful for how nodes are connected to edges, like network flow problems or finding cycles
            - Edge connecting node 2,3 and edge connection node 1,3
             incidenceMat = [
                [0, 1],
                [1, 0],
                [1, 1]
            ];
    - Traversal: visit nodes in the graph. Check if value is there or find distance
        - BFS
            - Queue or FIFO data structure. Do this to explore first neighbour next.
            - Start count with large number like Infinity to capture cases when node may not be reachable from start node
            - Shortest path, cycle detection
            - O (V + E)
            - Strategy
                - Infinity for all keys which is used to track unvisited nodes
                - Add root as first element queue.
                - Get the first element of the queue, and then the layer for the root which is all neighbors 1 edge away
                - Get the indices of all the neighbours
                - For each index, which is a neighbor, if it has not been visited
                    - Push it into queue
                    - Add 1 to whatever the current distance is from the root for the current item, and make that the distance at the index of the neighbour
                - Works because each layer has indices of neighbours, and those indices match the keys of the object returned
        - DFS
*/


var exBFSGraph = [
    [0, 1, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [0, 0, 1, 0]
];

function bfs(graph, root) {
    var nodesLen = {};
    for (var i = 0; i < graph.length; i++) {
        nodesLen[i] = i === root ? 0 : Infinity;
    }

    let queue = [root];
    let current; 

    while (queue.length !== 0) {
        current = queue.shift();

        let currConnected = graph[current];
        let neighborIdx = [];
        let idx = currConnected.indexOf(1);

        while (idx !== -1) {
            neighborIdx.push(idx);
            idx = currConnected.indexOf(1, idx + 1);
        }

        for (let j = 0; j < neighborIdx.length; j++) {
            if (nodesLen[neighborIdx[j]] === Infinity) {
                nodesLen[neighborIdx[j]] = nodesLen[current] + 1;
                queue.push(neighborIdx[j])
            }
        }
    }

    return nodesLen;
};

console.log(bfs(exBFSGraph, 1));
