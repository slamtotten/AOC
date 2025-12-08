import {puz} from "../../input.js"
var input = puz.split("\n").map(r=>r.split(""))

var totalSplits = 0

var beam = []
for(let x =0; x <input[0].length; x++){
    if(input[0][x] == "S"){beam.push(1)}
    else {beam.push(0)}
}

input.forEach(scnLine)

console.log("Total splits: ",totalSplits)
console.log("Total timelines: ",beam.reduce((a,b) => a+b))

function scnLine(line){
    for(let ind = 0; ind<line.length; ind++){
        if (line[ind] == "^" && beam[ind]>0){
            totalSplits++
            beam[ind-1]+= beam[ind]
            beam[ind+1]+= beam[ind]
            beam[ind] = 0
            }
        }
    }