import puz from '../../input.js'
let map = puz.split('\n').map(r=>r.split('->'))
let programs = []

for(let line of map){
    let x = line[0].match(/(\w+) \((\d+)\)/)
    let y = line[1]
    if(y!=undefined){y = y.split(',').map(r=> r.trim())}
    programs.push({id:x[1], weight:+x[2], supports: y})
}

let baseprog = null
let basecandidates = programs.filter(r=> r.supports!= undefined)
for(let progA of basecandidates){
    let base = true
    for(let progB of basecandidates){
        if(progB.supports.includes(progA.id)){base = false;break}
    }
    if (base == true){console.log(`Part A: ${progA.id}`);baseprog = progA}
}

balance(baseprog)

function balance(program){
    if(program.supports == undefined){return program.weight}
    let weights = []
    for(let prog of program.supports){
    weights.push(balance(programs.find(t=> t.id == prog)))
    }
    if(weights.every(r=> r == weights[0])==true){return (weights.reduce((a,b)=>a+b) + program.weight)}
    else { 
        let progind = weights.findIndex(r=> r!= weights[0])
        let dif = weights[progind] - weights[0]
        let probprog = programs.find(r=> r.id == program.supports[progind])
        console.log(`Part B: ${probprog.id}, Weight ${probprog.weight}, Corrected weight ${probprog.weight - dif}`)
    }
}
