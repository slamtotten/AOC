import puz from '../../input.js'

let x = puz.match(/(\d+)/g)
let banks = {}
for(let i = 0; i < x.length; i++){
    banks[i] = +x[i]
}
let configs = []
let steps = 0
do{
    configs.push(JSON.stringify(banks))
    let hb = Object.entries(banks).sort((a,b)=>b[1]-a[1])
    let [hbid, hbv] = hb[0]
    banks[hbid] = 0
    let pos = +hbid
    while(hbv > 0){
        pos = (pos + 1)%hb.length
        banks[pos]++
        hbv--
    }
    steps++
    let config = JSON.stringify(banks)
    if(configs.includes(config)){
        console.log(`Part A: ${steps}`)
        console.log(`Part B: ${configs.length - configs.indexOf(config)}`)
    }
}while(!configs.includes(JSON.stringify(banks)))