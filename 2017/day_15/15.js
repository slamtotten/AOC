import puz from '../../input.js'
let input = puz.split('\n')

let [factA,factB,div] = [16807,48271,2147483647]
let gens = {}
for(let line of input){
    let x = line.match(/Generator (?<id>\w) starts with (?<init>\d+)/).groups
    gens[x.id] = +x.init 
}

let count = 0
let pairs = 40000000
let [genA,genB] = [[],[]]
while(pairs>0){
    console.log(gens)
    gens.A = (gens.A * factA)%div
    gens.B = (gens.B * factB)%div
    if(gens.A%4 == 0){genA.push(gens.A.toString(2).slice(-16))}
    if(gens.B%8 == 0){genB.push(gens.B.toString(2).slice(-16))}
    let binA = gens.A.toString(2).slice(-16)
    let binB = gens.B.toString(2).slice(-16)
    if(binA == binB){count++}
    pairs--
    if(genA.length == 5000000 && genB.length == 5000000){break}
}
console.log(`Part A: ${count}`)

let countB = 0
for(let i = 0;i<genA.length; i++){
    if(genA[i] == genB[i]){countB++}
}
console.log(`Part B: ${countB}`)