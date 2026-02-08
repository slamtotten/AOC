import sequence from "../input.js"

var loc = [0,0]
var loclog = []

for(let m = 0; m <sequence.length; m++){
    if (loclog.includes(loc.toString()) == false){loclog.push(loc.toString())}
    loc = move(sequence[m],loc)
}
console.log(`Part A: ${loclog.length}`)

var [loc,rloc,loclog] = [[0,0],[0,0],[]]

for(let m = 0; m <sequence.length; m++){
    if(m%2 == 0){
        if (!loclog.includes(loc.toString())){loclog.push(loc.toString())}
        loc = move(sequence[m],loc)
    }else{
        if (!loclog.includes(rloc.toString())){loclog.push(rloc.toString())}
        rloc = move(sequence[m],rloc)
    }
}
console.log(`Part B: ${loclog.length}`)

function move(dir,loc){
    if (dir == "^"){loc[1]++}
    if (dir == ">"){loc[0]++}
    if (dir == "v"){loc[1]--}
    if (dir == "<"){loc[0]--}
    return loc
}