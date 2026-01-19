import puz from '../../input.js'
const input = puz.split('\n')

class Bot{
    constructor(id){
        this.id = id
        this.holding = []
        this.high = undefined
        this.low = undefined
    }
    give(val){
        if(this.holding.length<2){
            this.holding.push(val)
        }
        if(this.holding.length == 2){
            if(this.holding.includes(61) && this.holding.includes(17)){console.log(`Part A: ${this.id}`)}
            this.high.give(Math.max(this.holding[0],this.holding[1]))
            this.low.give(Math.min(this.holding[0],this.holding[1]))
            this.holding = []
        }
    }
}

class Output{
    constructor(id){
        this.id = id
        this.holding = []
    }
    give(val){
        this.holding.push(val)
    }
}

let [bots,outputs] = setup(input)
initValues(input)
let chips = []
for(let i = 0; i<3;i++){
    chips.push(outputs[i].holding[0])
}
console.log(`Part B: ${chips.reduce((a,b)=>a*b)}`)


function initValues(arr){
    for(let line of arr){
        if(line.match('value') != null){
            let x = line.match(/value (?<val>\d+) goes to bot (?<id>\d+)/).groups
            bots[x.id].give(x.val)
        }
    }

}

function setup(arr){
    let [bots,outputs] = [[],[]]
    for(let line of arr){
        let b = line.matchAll(/bot (\d+)/g)
        b.forEach(r=> {if(!bots.some(t=> t.id === r[1])){bots.push(new Bot(r[1]))}})
        let o = line.matchAll(/output (\d+)/g)
        if(o != null){o.forEach(r => {if(!outputs.some(t=> t.id === r[1])){outputs.push(new Output(r[1]))}})}
    }
    bots.sort((a,b)=>a.id-b.id)
    outputs.sort((a,b)=>a.id - b.id)
    setTargets(arr, bots, outputs)
    return [bots,outputs]
}

function setTargets(arr, bots, outputs){
    for(let line of arr){
        if(!line.includes('value')){
            let x = line.match(/bot (?<botid>\d+) gives low to (?<lowtype>output|bot) (?<lowid>\d+) and high to (?<hightype>output|bot) (?<highid>\d+)/).groups
            if(x.lowtype == 'bot'){bots[x.botid].low = bots[x.lowid]}
            else{bots[x.botid].low = outputs[x.lowid]}
            if(x.hightype == 'bot'){bots[x.botid].high = bots[x.highid]}
            else{bots[x.botid].high = outputs[x.highid]}
        }
    }
}
