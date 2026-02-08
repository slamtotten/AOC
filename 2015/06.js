import puz from "../input.js"
const input = puz.split("\n")

const seq = []
for(let line of input){
    let x = line.match(/(?<op>toggle|turn on|turn off) (?<scx>\d+),(?<scy>\d+) through (?<ecx>\d+),(?<ecy>\d+)/).groups
    seq.push({op:x.op, sc:[+x.scx,+x.scy], ec:[+x.ecx,+x.ecy]})
}

let gridsize = 1000
let [gridA,gridB] = [[],[]]
while(gridA.length<gridsize){gridA.push(new Array(gridsize).fill('.'))}
while(gridB.length<gridsize){gridB.push(Array(gridsize).fill(0))}

for(let inst of seq){
    if(inst.op == 'turn on'){on(inst.sc, inst.ec)}
    if(inst.op == 'turn off'){off(inst.sc, inst.ec)}
    if(inst.op == 'toggle'){toggle(inst.sc, inst.ec)}
}

console.log(`Part A: ${count(gridA)}`)
console.log(`Part B: ${gridB.flat().reduce((a,b)=>a+b)}`)

function count(arr){
    let lights = 0
    for(let line of arr){
        for (let id = 0; id <line.length; id++){
            if (line[id] == '@'){lights++}
        }
    }
    return lights
}

function on(sc,ec){
    for(let y = Math.min(sc[1],ec[1]); y <= Math.max(sc[1],ec[1]); y++){
        for(let x = Math.min(sc[0],ec[0]); x <= Math.max(sc[0],ec[0]); x++){
           gridA[y][x] = '@'
           gridB[y][x]++ 
        }
    }    
}
function off(sc, ec){
    for(let y = +Math.min(sc[1],ec[1]); y <= +Math.max(sc[1],ec[1]); y++){
        for(let x = +Math.min(sc[0],ec[0]); x <= +Math.max(sc[0],ec[0]); x++){
           gridA[y][x] = '.' 
           if(gridB[y][x] >0){gridB[y][x]--}
        }
    }
}
function toggle(sc,ec){
    for(let y = +Math.min(sc[1],ec[1]); y <= +Math.max(sc[1],ec[1]); y++){
        for(let x = +Math.min(sc[0],ec[0]); x <= +Math.max(sc[0],ec[0]); x++){
            gridB[y][x]+=2
            if(gridA[y][x] !== '@'){gridA[y][x] = '@'}
            else{gridA[y][x] = '.'}
        }
    }   
}