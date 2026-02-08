import puz from "../input.js"

let count = 0
for(let x = 0; x<puz.length; x++){
    if (puz[x]=="("){count++}else {count--}
}
console.log(`Part A: ${count}`);

let floor = 0
for (let x = 0; x < puz.length; x++){
    if (puz[x]=="("){floor++}
    else {floor--}
    if (floor < 0){console.log(`Part B: ${x+1}`); break}
    }