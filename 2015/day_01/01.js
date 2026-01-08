import puz from "../../input.js"

// Part A
let count = 0
for(let x = 0; x<puz.length; x++){
    if (puz[x]=="("){count++}else {count--}
}
console.log(count);

// Part B
let floor = 0
for (let x = 0; x < puz.length; x++){
    if (puz[x]=="("){floor++}
    else {floor--}
    if (floor < 0){console.log(x+1); break}
    }