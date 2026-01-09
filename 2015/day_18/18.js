import puz from '../../input.js'
let lights = puz.split("\n").map(r=>r.split(""))

let [on,off] = ['#','.']

console.log(count(cycle(lights,100)))

function setCorners(grid){
    let maxY = grid.length - 1
    let maxX = grid[0].length - 1
    grid[0][0] = on
    grid[0][maxX] = on
    grid[maxY][0] = on
    grid[maxY][maxX] = on
}

function cycle(grid, cycles){
    do{
        setCorners(grid)
        let newGrid = []
        for(let y = 0;y<grid.length;y++){
            let newRow = []
            for(let x = 0; x<grid[y].length;x++){
                let adj = adjChk(y,x,grid)
                if (grid[y][x] == on && (adj == 2||adj == 3)){newRow.push(on)}
                else if (grid[y][x] == off && adj == 3){newRow.push(on)}
                else{newRow.push(off)}
            }
            newGrid.push(newRow)
        }
        grid = newGrid
        cycles--
    }while(cycles>0)
    setCorners(grid)
    return grid
}

function adjChk(row, id, arr){
    let adjlight = 0
    for (let y = -1; y <=1; y++){
        for (let x = -1; x<=1; x++){
            if (x==0 && y==0){continue}
            if (row+y<0||row+y>=arr.length||id+x<0||id+x>row.length){continue}
            if (arr[row+y][id+x] == on){adjlight++}
        }
    } 
    return adjlight
}

function count(arr){
    let lights = 0
    for(var line of arr){
        for (let pos of line)
            if (pos == on){lights++}
    }
    return lights
}