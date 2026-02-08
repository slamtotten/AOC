import puz from '../../input.js'
let map = puz.split('\n').map(r=>r.split(''))

let pos = [Math.floor(map[0].length/2),Math.floor(map.length/2)]
let dir = 0
let infCount = 0

let loops = 10000000
while(loops >0){
    if (map[pos[1]][pos[0]] == '#'){
        dir = (dir + 1)%4
        map[pos[1]][pos[0]] = 'F'
    }
    else if(map[pos[1]][pos[0]] == '.'){
        dir = (dir + 3)%4
        map[pos[1]][pos[0]] = 'W'
    }
    else if(map[pos[1]][pos[0]] == 'W'){
        map[pos[1]][pos[0]] = '#'
        infCount++
    }
    else if(map[pos[1]][pos[0]] == 'F'){
        dir = (dir + 2)%4
        map[pos[1]][pos[0]] = '.'
    }
    pos = posInc(pos,dir)
    if(pos[0] == -1){map.forEach(r=> r.unshift('.'));pos[0]++}
    if(pos[0] == map[0].length){map.forEach(r=>r.push('.'))}
    if(pos[1] == -1){map.unshift(new Array(map[0].length).fill('.'));pos[1]++}
    if(pos[1] == map.length){map.push(new Array(map[0].length).fill('.'))}
    loops--
}
console.log(infCount)

function posInc(pos,dir){
    if(dir == 0){pos[1]--}
    if(dir == 1){pos[0]++}
    if(dir == 2){pos[1]++}
    if(dir == 3){pos[0]--}
    return pos
}