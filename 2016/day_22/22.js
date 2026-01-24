import puz from '../../input.js'
let input = puz.split('\n')
let nodes = []
for(let line of input){
    let x = line.match(/x(?<x>\d+)-y(?<y>\d+)\s+(?<size>\d+)T\s+(?<used>\d+)T\s+(?<avail>\d+)T\s+(?<useperc>\d+)\%/)
    if(x != null){nodes.push({pos:[+x.groups.x, +x.groups.y], size: +x.groups.size, used: +x.groups.used, avail: +x.groups.avail, useperc: +x.groups.useperc})}
}

let vp = 0
for(let i = 0; i<nodes.length;i++){
    if(nodes[i].used != 0){
        for(let ii = 0; ii < nodes.length;ii++){
            if(i == ii){continue}
            if(nodes[i].used <= nodes[ii].avail){
                vp++
            }
        }
    }
}
console.log(`Part A: ${vp}`)

let grid = []
for(let y = 0; y < 29; y++){
    let row = []
    for(let x = 0; x < 33;x++){
        row.push('')
    }
    grid.push(row)
}

for(let node of nodes){
    if(node.used == 0){grid[node.pos[1]][node.pos[0]] = '_';q.push([node.pos[0],node.pos[1],0, 32, 0])}
    else if(node.used > 100){grid[node.pos[1]][node.pos[0]] = '#'}
    else if(node.pos[1] == 0 && node.pos[0] == 32){grid[node.pos[1]][node.pos[0]] = 'G'}
    else {grid[node.pos[1]][node.pos[0]] = '.'}
}

let [q,visited] = [[],[]]

while(q.length>0){
    let [x,y,steps, gx, gy] = q.shift()
    if(visited.includes([x,y,gx,gy].toString())){continue}
    visited.push([x,y,gx,gy].toString())
    if (gx == 0 && gy == 0){console.log(steps);break}
    if (gy > 0){continue}
    if(x > 0 && grid[y][x-1] != '#' && x-1 == gx && y == gy){q.push([x-1,y,steps+1,gx+1,gy])}
    else if(x > 0 && grid[y][x-1] != '#'){q.push([x-1,y,steps+1,gx,gy])}
    if(x < 32 && grid[y][x+1] != '#' && x+1 == gx && y == gy){q.push([x+1,y,steps+1,gx-1,gy])}
    else if(x < 32 && grid[y][x+1] != '#'){q.push([x+1,y,steps+1,gx,gy])}
    if(y > 0 && grid[y-1][x] != '#' && x == gx && y-1 == gy){q.push([x,y-1,steps+1,gx,gy+1])}
    else if(y > 0 && grid[y-1][x] != '#'){q.push([x,y-1,steps+1,gx,gy])}
    if(y < 28 && grid[y+1][x] != '#' && x == gx && y+1 == gy){q.push([x,y+1,steps+1,gx,gy-1])}
    else if(y < 28 && grid[y+1][x] != '#'){q.push([x,y+1,steps+1,gx,gy])}
}