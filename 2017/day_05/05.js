import puz from '../../input.js'
let insts = puz.split('\n').map(r => +r)

let steps = 0
for (let i = 0; i < insts.length; ){
    let jump = i + insts[i]
    if(insts[i] >=3){insts[i]--}
    else{insts[i]++}
    steps++
    i = jump
}
console.log(steps)