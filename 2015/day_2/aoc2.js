console.time('time')
import { readFileSync } from 'node:fs';

//var input = readFileSync("./test.txt", "utf8");
var input = readFileSync("./input.txt", "utf8").split("\r\n").map(r => r.split("x"))

var sqft = 0
var ribbon = 0

const area = (w,l,h) => {return 2*(w*l+l*h+h*w)}
const extra = (w,l) => {return w*l}
const circ = (w,l) => {return 2*((+w)+(+l))}
const volu = (w,l,h) => {return w*l*h}

//paper sqft (pt1)
/*for (let box = 0; box < input.length; box++){
    input[box].sort((a,b) => a-b)
    sqft += area(input[box][0],input[box][1],input[box][2])
    sqft += extra(input[box][0],input[box][1])
}*/
console.log(sqft)
//ribbon length (pt2)
for (let box = 0; box<input.length; box++){
    input[box].sort((a,b) => a-b)
    ribbon += circ(input[box][0],input[box][1])
    ribbon += volu(input[box][0],input[box][1],input[box][2])
}
console.log(ribbon)

