import puz from '../../input.js'
let totElves = +puz

let elves = []
for(let e = 1; e<=totElves;e++){
    elves.push({id: e})
}
let elvesB = structuredClone(elves)

while(elves.length>1){
    let nelves = []
    for(let i = 0; i<elves.length;i++){
        if(i%2 === 0){nelves.push(elves[i])}
    }
    if (elves.length%2 === 1){nelves.shift()}
    elves = structuredClone(nelves)
}
console.log(`Part A: ${elves}`)

while(elvesB.length>1){
    for(let e = 0; e<elvesB.length;e++){
        let opposite = (Math.floor(elvesB.length/2) + e)%elvesB.length
        elvesB.splice(opposite,1)
        if(opposite<e){e--}
    }
}
console.log(`Part B: ${elvesB}`)