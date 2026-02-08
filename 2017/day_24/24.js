import puz from '../../input.js'
let comps = puz.split('\n').map(r=>r.split('/'))

let starts = comps.filter(r => r.includes('0'))

let bridges = []
for(let comp of starts){
    let bridge = [comp]
    let nxt = comp.find(r=>r!=0)
    addComp(bridge, nxt, comps.filter(r=>r!=comp))
}

let strngths = []
for(let bridge of bridges){
    let strngth = bridge.flat().reduce((a,b)=>+a + +b)
    strngths.push(strngth)
}
console.log(`Part A: ${strngths.sort((a,b)=>b - a).shift()}`)

bridges.sort((a,b)=>b.length-a.length)
let longbridges = bridges.filter(r=>r.length == bridges[0].length)

let bstrngths = []
for(let bridge of longbridges){
    let strngth = bridge.flat().reduce((a,b)=>+a + +b)
    bstrngths.push(strngth)
}
console.log(`Part B: ${bstrngths.sort((a,b)=>b-a).shift()}`)

function addComp(bridge, nxt, comps){
    bridges.push(bridge)
    let nxtComps = comps.filter(r => r.includes(nxt))
    for(let comp of nxtComps){
        let nbridge = structuredClone(bridge)
        let remcomps = comps.filter(r=>r!=comp)
        let end = ''
        if(comp[0] == comp[1]){end = nxt}
        else{end = comp.find(r=>r!=nxt)}

        nbridge.push(comp)
        addComp(nbridge,end,remcomps)
    }
}
