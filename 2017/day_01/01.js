import puz from '../../input.js'

let matchdigits = []
for(let i = 0; i<puz.length;i++){
    if(puz[i] === puz[(i+1)%puz.length]){matchdigits.push(+puz[i])}
}
console.log(`Part A: ${matchdigits.reduce((a,b)=> a+b)}`)

matchdigits = []
for(let i = 0; i<puz.length;i++){
    if(puz[i] === puz[(puz.length/2+i)%puz.length]){matchdigits.push(+puz[i])}
}
console.log(`Part B: ${matchdigits.reduce((a,b)=> a+b)}`)