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
    - Traversal: visit nodes in the graph
        - BFS
        - DFS
*/

