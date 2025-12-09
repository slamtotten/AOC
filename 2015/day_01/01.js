import puz from "../../input.js"
var input = puz

// Part A
var up ="("
var dn =")"

let count = 0
for(let x = 0; x<input.length; x++){
    if (input[x]==up){count++}else {count--}
}
console.log(count);

// Part B
let floor = 0
for (let x = 0; x < input.length; x++){
    if (input[x]==up){floor++}
    else {floor--}
    if (floor < 0){console.log(x+1); break}
    }