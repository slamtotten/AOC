import puz from '../../input.js'
let bp = puz.split('\n\n').map(r => r.split('\n'))

let init = bp.shift()
let strt = init[0].match(/Begin in state (\w)/)[1]
let steps = +init[1].match(/checksum after (\d+)/)[1]

class State{
    constructor(w0,m0,ns0,w1,m1,ns1){
        this.st0 = [w0,m0,ns0]
        this.st1 = [w1,m1,ns1]
    }
    getVals(num){
        if(num == 0){return this.st0}
        if(num == 1){return this.st1}
    }
}

let states = {}
for(let state of bp){
    let id = state[0].match(/In state (\w)/)[1]
    let w0 = +state[2].match(/Write the value (\d)/)[1]
    let m0 = state[3].match(/Move one slot to the (\w+)/)[1]
    let ns0 = state[4].match(/Continue with state (\w)/)[1] 
    let w1 = +state[6].match(/Write the value (\d)/)[1]
    let m1 = state[7].match(/Move one slot to the (\w+)/)[1]
    let ns1 = state[8].match(/Continue with state (\w)/)[1] 
    states[id] = new State(w0,m0,ns0,w1,m1,ns1)
}

let tape = [0]
let pos = 0
let state = states[strt]

while(steps > 0){
    let vals = state.getVals(tape[pos])
    tape[pos] = vals[0]
    pos = move(pos, vals[1])
    state = states[vals[2]]
    steps--
}

console.log(tape.reduce((a,b)=>a+b))

function move(pos,dir){
    if(dir == 'right'){pos++}
    if(dir == 'left'){pos--}
    if(pos == -1){tape.unshift(0); pos++}
    if(pos == tape.length){tape.push(0)}
    return pos
}