import puz from '../../input.js'
let map = puz.split('\n')

let start = []
for(let i = 0; i < map.length; i++){
    if(map[i].includes('0')){start.push(map[i].indexOf('0'),i)}
}

let q = []
q.push([start[0],start[1],0,[]])
let vis = []
while(q.length>0){
    let [x,y,steps,nums] = q.shift()
    let nnums = structuredClone(nums)
    if(map[y][x] != '.' && nnums.includes(map[y][x])== false){nnums.push(map[y][x])}
    nnums.sort((a,b)=>a-b)
    if(nnums.length == 8){q = q.filter(r=> r[3].length > 6)}
    if(nnums.length == 8 && map[y][x] == "0"){console.log(steps);break}
    if(vis.includes([x,y,nnums].toString())){continue}
    vis.push([x,y,nnums].toString())
    if(map[y][x-1] != '#'){q.push([x-1,y,steps+1,nnums])}
    if(map[y][x+1] != '#'){q.push([x+1,y,steps+1,nnums])}
    if(map[y-1][x] != '#'){q.push([x,y-1,steps+1,nnums])}
    if(map[y+1][x] != '#'){q.push([x,y+1,steps+1,nnums])}
}