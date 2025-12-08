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

// part 2
let floor = 0
for (let ind = 0; ind < input.length; ind++){
    
    if (input[ind] == up){
        floor++
    } else if (input[ind] == dn){
        floor--
        if (floor < 0){
            console.log(ind+1);
            break
        }
    }
}
console.timeEnd()