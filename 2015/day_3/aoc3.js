import { readFileSync } from "fs";
var sequence = readFileSync("input.txt","utf8")

//Part A
var loc = [0,0]
var loclog = []

for(let m = 0; m <sequence.length; m++){
    if (loclog.includes(loc.toString()) == false){loclog.push(loc.toString())}
    let dir = sequence[m]
    
    if (dir == "^"){loc[1]++}
    else if (dir == ">"){loc[0]++}
    else if (dir == "v"){loc[1]--}
    else if (dir == "<"){loc[0]--}
}
console.log("Part A:")
console.log("Unique Houses:",loclog.length)
console.log("Total moves:",sequence.length)

//Part B
var loc = [0,0]
var rloc = [0,0]
var loclog = []


for(let m = 0; m <sequence.length; m++){
    if(m%2 == 0){
        if (loclog.includes(loc.toString()) == false){loclog.push(loc.toString())}
        let dir = sequence[m]
        if (dir == "^"){loc[1]++}
        else if (dir == ">"){loc[0]++}
        else if (dir == "v"){loc[1]--}
        else if (dir == "<"){loc[0]--}
    }else{
    if (loclog.includes(rloc.toString()) == false){loclog.push(rloc.toString())}
        let dir = sequence[m]
        if (dir == "^"){rloc[1]++}
        else if (dir == ">"){rloc[0]++}
        else if (dir == "v"){rloc[1]--}
        else if (dir == "<"){rloc[0]--}
    }
}
console.log("Part B:")
console.log("Unique Houses:",loclog.length)
console.log("Total moves:",sequence.length)
