import puz from '../../input.js'
let id = +puz

/*
for(let i = 1; ; i+=2){
    let x = i*i
    if (x > id){
        let row = Math.ceil(i/2)
        let lowercorner = x-(i-1)
        while(lowercorner > id){
            lowercorner = lowercorner - (i-1)
        }
        console.log(id - lowercorner, x-id, Math.ceil(i/2), i, x -((i-2)**2))
        break}
}*/

let gridSize = 9
let ringCount = (gridSize-1)/2
let dy = [-1,0,1,0]
let dx = [0,-1,0,1]
let dCount = 4
let y = ringCount
let x = ringCount
let repeatCount = 0
let grid = new Array(gridSize)
for(let i = 0; i<grid.length;i++){
    grid[i] = new Array(gridSize)
}
grid[y][x] = 1

for(let ring = 0; ring<ringCount; ring++){
    y++
    x++
    repeatCount += 2
    for(let dir = 0;dir <dCount; dir++){
        for(let rep = 0; rep<repeatCount; rep++){
            y+= dy[dir]
            x+= dx[dir]
            grid[y][x] = adjTot(y,x)
            if(grid[y][x]>= id){console.log(grid[y][x])}
        }
    }
}

function adjTot(row, id){
    let tot = 0
    for (let y = -1; y <=1; y++){
        for (let x = -1; x<=1; x++){
            if (x==0 && y==0){continue}
            if(grid[row + y] == undefined){continue}
            let num = grid[row + y][id + x] ?? 0
            tot += num
        }
    } 
    return tot
}

