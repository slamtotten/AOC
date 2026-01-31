import puz from '../../input.js'
let seq = puz.split(',')

let dirs = {q:0,r:0,s:0}
let [maxDist,dist] = [0,0]
for(let move of seq){
    if(move == 'n'){dirs.r--;dirs.s++}
    if(move == 's'){dirs.r++;dirs.s--}
    if(move == 'ne'){dirs.q++;dirs.r--}
    if(move == 'sw'){dirs.q--;dirs.r++}
    if(move == 'nw'){dirs.q--;dirs.s++}
    if(move == 'se'){dirs.q++;dirs.s--}
    dist = Object.values(dirs).reduce((a,b)=> Math.abs(a)+Math.abs(b))/2
    if(dist > maxDist){maxDist = dist}
}

console.log(`Part A: ${dist}`)
console.log(`Part B: ${maxDist}`)