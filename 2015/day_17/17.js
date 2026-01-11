import puz from '../../input.js'
let x = puz.split('\n')

const containers = []
for(let i = 0; i<x.length;i++){
    containers.push({con:i+1,vol:+x[i]})
}

const combos = []
addCon(containers,0,[])
console.log("Part A: ",combos.length, "different combinations")

let minConCombos = combos.map(r=>r.split(",")).sort((a,b)=>a.length-b.length)
minConCombos = minConCombos.filter(r => r.length == minConCombos[0].length)
console.log("Part B: ",minConCombos.length,"different combinations using minimum containers")

function addCon(arr, vol, used){
    for(let con of arr){
        let remcon = arr.filter(r=>r!=con)
        let newused = used.concat([con.con])
        let cvol = vol + con.vol
        if (cvol == 150){
            let combo = newused.sort((a,b)=>a-b).toString()
            if(combos.includes(combo) == false){combos.push(combo)}
            continue
        }
        if (cvol >150){continue}
        if (remcon.length > 0){addCon(remcon, cvol, newused)}
    }
}