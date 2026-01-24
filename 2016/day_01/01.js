import puz from '../../input.js'
const seq = puz.split(', ').map(r => {
    let x = r.match(/(?<turn>\w)(?<dist>\d+)/).groups
    return {turn: x.turn, dist: +x.dist}
})

let [x,y,dir] = [0,0,0]
let [visited, revisit] =[[],[]]

for(let move of seq){
    dir = turn(dir,move.turn)
    for(let m = 0;m<move.dist;m++){
        if(dir == 0){y++}
        if(dir == 1){x++}
        if(dir == 2){y--}
        if(dir == 3){x--}
        if(!visited.includes([x,y].toString())){visited.push([x,y].toString())}
        else{revisit.push([x,y])}
    }
}

console.log(`Part A: ${Math.abs(x) + Math.abs(y)}`)
let b = revisit.shift()
console.log(`Part B: ${Math.abs(b[0])+Math.abs(b[1])}`)

function turn(cdir, turn){
    if(turn == "L"){cdir--}
    if(turn == "R"){cdir++}
    if(cdir == -1){cdir = 3}
    if(cdir == 4){cdir = 0}
    return cdir
}