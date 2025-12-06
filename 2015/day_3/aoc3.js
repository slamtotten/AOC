import { readFileSync } from "fs";
var sequence = readFileSync("input.txt","utf8")

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
console.log("Unique Houses:",loclog.length)
console.log("Total moves:",sequence.length)
