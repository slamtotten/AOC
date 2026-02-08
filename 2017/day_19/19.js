import puz from '../../input.js'
let map = puz.split('\n')

let pos = [map[0].indexOf('|'),0]
let str = ''
let vis = []
let dir = 'dn'

while(!str.includes('Y')){
    vis.push(pos.toString())
    if(map[pos[1]][pos[0]].match(/[A-Z]/)!=null){str += map[pos[1]][pos[0]]}
    if(map[pos[1]][pos[0]] == '+'){dir = setDir(pos)}
    if(dir == 'dn'){pos[1]++}
    if(dir == 'up'){pos[1]--}
    if(dir == 'right'){pos[0]++}
    if(dir == 'left'){pos[0]--}
}

console.log(`Part A: ${str}`)
console.log(`Part B: ${vis.length}`)

function setDir([x,y]){
    if(!vis.includes([x,y+1].toString()) && map[y+1][x] == '|'){return 'dn'}
    if(!vis.includes([x,y-1].toString()) && map[y-1][x] == '|'){return 'up'}
    if(!vis.includes([x+1,y].toString()) && map[y][x+1] == '-'){return 'right'}
    if(!vis.includes([x-1,y].toString()) && map[y][x-1] == '-'){return 'left'}
}