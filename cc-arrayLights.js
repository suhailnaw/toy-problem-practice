function checkIllumination(N, lamps, queries) {
    //I'm rotating the grid to follow a simpler 2D array naming convention, so even though the problem states the bottom left is 1,1 and the top right is N,N, my solution will still be valid
    //I'm also assuming all inputs are valid
    
    let outputArr = [];
    let horizontalLamps = {};
    let verticalLamps = {};
    let leftDiagonalLamps = {};
    let rightDiagonalLamps = {};
    let lampsObj = {};
    
    const countNearbyLamps = function(row, column){
        let count = 0;
        let adjacentCells = [[row - 1, column - 1], [row - 1, column], [row - 1, column + 1], [row, column + 1], [row + 1, column + 1], [row + 1, column], [row + 1, column - 1], [row - 1, column]];
        for(let i = 0; i < adjacentCells.length; i++) {
            if(lampsObj[adjacentCells[i]] !== undefined) {
                count++;
            }
        }
        return count;
    }
    
    for(let i = 0; i < lamps.length; i++) {
        let lamp = lamps[i];
        let row = lamp[0] - 1;
        let column = lamp[1] - 1;
        
        lampsObj[lamp] = true;
        
        if(horizontalLamps[row] !== undefined) {
            horizontalLamps[row]++;
        } else {
            horizontalLamps[row] = 1;
        }
        
        if(verticalLamps[column] !== undefined) {
            verticalLamps[column]++;
        } else {
            verticalLamps[column] = 1;
        }
        
        if(leftDiagonalLamps[row + column] !== undefined) {
            leftDiagonalLamps[row + column]++;
        } else {
            leftDiagonalLamps[row + column] = 1;
        }
        
        if(rightDiagonalLamps[row - column] !== undefined) {
            rightDiagonalLamps[row - column]++;
        } else {
            rightDiagonalLamps[row - column] = 1;
        }
    }
    
    for(let i = 0; i < queries.length; i++) {
        let query = queries[i];
        let row = query[0] - 1;
        let column = query[1] - 1;
        let count = countNearbyLamps(row, column);
        if(horizontalLamps[row] > count || verticalLamps[column] > count || leftDiagonalLamps[row + column] > count || rightDiagonalLamps[row - column] > count) {
            outputArr.push('LIGHT');
        } else {
            outputArr.push('DARK');
        }
    }
    

    
    return outputArr;
}


console.log(checkIllumination(8, [[4, 3], [4, 4]], [[3, 4], [7, 6]]));

//expect Dark, Light

console.log(checkIllumination(8, [[1, 6], [5, 6], [7, 3], [3, 2]], [[4, 4], [6, 6], [8, 1], [3, 2], [2, 3]]));

//expect Dark, Light, Dark, Dark, Light

console.log(checkIllumination(5, [[0, 0], [4, 4]], [[1,1]]));