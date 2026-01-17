import puz from '../../input.js'
let input = puz.split('\n')

let seq = []
for (let line of input){
    if (line.includes('rect')){
        let dims = line.match(/(?<x>\d+)x(?<y>\d+)/).groups
        seq.push({type: 'rect', x:dims.x, y:dims.y})
    }
    else{
        let rotate = line.match(/(?<dir>row|column) (?:x|y)=(?<id>\d+) by (?<amp>\d+)/).groups
        seq.push({type:'rotate', dir:rotate.dir, id: rotate.id, amp: rotate.amp})
    }
}

let grid = createGrid(6,50)

for(let inst of seq){
    if(inst.type == 'rect'){rect(inst.x,inst.y)}
    else {rotate(inst.dir,inst.id,inst.amp)}
}

console.log(`Part A: ${count(grid)} lit pixels`)
console.log(`Part B:`)
console.table(grid)

function createGrid(height,width){
    let grid = []
    for(let y = 0; y < height; y++){
        let row = []
        for(let x = 0;x <width; x++){
            row.push('.')
        }
        grid.push(row)
    }
    return grid
}

function rect(width,height){
    for (let y = 0; y < height; y++){
        for (let x = 0; x < width; x++){
            grid[y][x] = "#"

        }
    }
}

function rotate(dir,id,amp){
    let refGrid = structuredClone(grid)
    if(dir == "row"){
        for(let pos = 0; pos < grid[id].length; pos++){
            let refPos = pos - amp
            if (refPos < 0){refPos = grid[id].length + refPos}
            if (refPos > grid[id].length){refPos = refPos%grid[id].length}
            refGrid[id][pos] = grid[id][refPos]
        }
    }else{
        for(let pos = 0; pos < grid.length; pos++){
            let refPos = pos - amp
            if (refPos < 0){refPos = grid.length + refPos}
            if (refPos >= grid.length){refPos = refPos%grid.length}
            refGrid[pos][id] = grid[refPos][id]
        }
    }
    grid = refGrid
}

function count(arr){
    let pix = 0
    for(var line of arr){
        for (let x = 0; x <line.length; x++){
            if (line[x]== "#"){pix++}
        }
    }
    return pix
}
