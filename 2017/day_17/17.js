import puz from '../../input.js'

let spin = [0]
let pos = 0
for(let i = 1;i<2018;i++){
    pos = (pos + +puz)%spin.length + 1
    spin.splice(pos,0,i)
}
console.log(`Part A: ${spin[spin.indexOf(2017)+1]}`)

pos = 0
for(let ii = 1; ii<50000001; ii++){
    pos = (pos + +puz)%ii + 1
    if(pos == 1){console.log(ii)}
}
    