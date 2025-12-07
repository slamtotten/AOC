import { readFileSync } from "fs";
//var input = readFileSync("test.txt","utf8").split("\n").map(r=>r.split(""))
var input = readFileSync("input.txt","utf8").split("\n").map(r=>r.split(""))

var totalSplits = 0

var beam = []
let chartwidth = input[0].length
while(chartwidth>0){
    beam.push(0)
    chartwidth--
}
beam[input[0].indexOf("S")] = 1

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