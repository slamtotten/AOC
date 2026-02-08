import puz from '../../input.js'
let input = puz.split('\n')

let seq = []
for(let line of input){
    let x = line.match(/(?<func>\w+) (?<a>-?\w+) ?(?<b>-?\w+)?/).groups
    seq.push({func:x.func, a:x.a, b:x.b})
}

let regs = {}
for(let inst of seq){
    if(inst.a.match(/\d/)==null){regs[inst.a] = 0}
}

let tones = []
let recovered = []

for(let i = 0; i < seq.length; i++){
    if(seq[i].func == 'snd'){tones.push(regs[seq[i].a])}
    if(seq[i].func == 'set'){regs[seq[i].a] = regs[seq[i].b] ?? +seq[i].b}
    if(seq[i].func == 'add'){regs[seq[i].a] += regs[seq[i].b] ?? +seq[i].b}
    if(seq[i].func == 'mul'){regs[seq[i].a] *= regs[seq[i].b] ?? +seq[i].b}
    if(seq[i].func == 'mod'){regs[seq[i].a] %= regs[seq[i].b] ?? +seq[i].b}
    if(seq[i].func == 'rcv'){if(regs[seq[i].a] != 0){recovered.push(tones.pop());break}}
    if(seq[i].func == 'jgz'){let ref = regs[seq[i].a] ?? +seq[i].a; if(ref>0){i += regs[seq[i].b] ?? +seq[i].b;i--}}
}

console.log(`Part A: ${recovered.shift()}`)

let [regs0,regs1] = [{},{}]
for(let inst of seq){
    if(inst.a.match(/\d/)==null){regs0[inst.a] = 0;regs1[inst.a] = 0}
}
regs1.p = 1

let [q0,q1] = [[],[]]
let [pos0,pos1] = [0,0]
let sent = 0
let [wait0,wait1] = [false,false]

prog0()
console.log(`Part B: ${sent}`)

function prog0() {
    if(wait0 == true && wait1 == true && q0.length == 0 && q1.length == 0){return}
    wait0 = false
    while(wait0 == false){
        if(pos0>seq.length){return}
        if(seq[pos0].func == 'snd'){q0.push(regs0[seq[pos0].a]); pos0++}
        if(seq[pos0].func == 'set'){regs0[seq[pos0].a] = regs0[seq[pos0].b] ?? +seq[pos0].b; pos0++}
        if(seq[pos0].func == 'add'){regs0[seq[pos0].a] += regs0[seq[pos0].b] ?? +seq[pos0].b; pos0++}
        if(seq[pos0].func == 'mul'){regs0[seq[pos0].a] *= regs0[seq[pos0].b] ?? +seq[pos0].b; pos0++}
        if(seq[pos0].func == 'mod'){regs0[seq[pos0].a] %= regs0[seq[pos0].b] ?? +seq[pos0].b; pos0++}
        if(seq[pos0].func == 'rcv'){if(q1[0] == undefined){wait0 = true; prog1(pos1)}else{regs0[seq[pos0].a] = q1.shift()}; pos0++}
        if(seq[pos0].func == 'jgz'){let ref = regs0[seq[pos0].a] ?? +seq[pos0].a;if(ref>0){pos0 += regs0[seq[pos0].b] ?? +seq[pos0].b}else{pos0++}}
    }
}

function prog1() {
    if(wait0 == true && wait1 == true && q0.length == 0 && q1.length == 0){return}
    wait1 = false
    while(wait1 == false){
        if(pos1>seq.length){return}
        if(seq[pos1].func == 'snd'){q1.push(regs1[seq[pos1].a]); sent++; pos1++}
        if(seq[pos1].func == 'set'){regs1[seq[pos1].a] = regs1[seq[pos1].b] ?? +seq[pos1].b; pos1++}
        if(seq[pos1].func == 'add'){regs1[seq[pos1].a] += regs1[seq[pos1].b] ?? +seq[pos1].b; pos1++}
        if(seq[pos1].func == 'mul'){regs1[seq[pos1].a] *= regs1[seq[pos1].b] ?? +seq[pos1].b; pos1++}
        if(seq[pos1].func == 'mod'){regs1[seq[pos1].a] %= regs1[seq[pos1].b] ?? +seq[pos1].b; pos1++}
        if(seq[pos1].func == 'rcv'){if(q0[0] == undefined){wait1 = true; prog0(pos0)}else{regs1[seq[pos1].a] = q0.shift()}; pos1++}
        if(seq[pos1].func == 'jgz'){let ref = regs1[seq[pos1].a] ?? +seq[pos1].a; if(ref>0){pos1 += regs1[seq[pos1].b] ?? +seq[pos1].b}else{pos1++}}
    }
}
