import puz from '../../input.js'
let input = puz.split(',')

let progs = []
for(let i = 0; i<16;i++){
    progs.push(String.fromCharCode(97+i))
}

let seq = []
for(let line of input){
    if(line[0]=='s'){let x = line.match(/(?<func>\w)(?<amp>\d+)/).groups;seq.push({func:x.func, amp:+x.amp})}
    if(line[0]=='x'){let x = line.match(/(?<func>\w)(?<posA>\d+)\/(?<posB>\d+)/).groups; seq.push({func:x.func, posA:+x.posA, posB:+x.posB})}
    if(line[0]=='p'){let x = line.match(/(?<func>\w)(?<progA>\w)\/(?<progB>\w)/).groups; seq.push({func:x.func, progA:x.progA, progB:x.progB})}
}

let loops = 1000000000%24
for(let i = 0; i< loops;i++){
    for(let inst of seq){
        if(inst.func == 's'){progs = spin(progs,inst.amp)}
        if(inst.func == 'x'){exch(progs,inst.posA,inst.posB)}
        if(inst.func == 'p'){part(progs,inst.progA,inst.progB)}
    }
    if(i == 0){console.log(`Part A: ${progs.join('')}`)}
}
console.log(`Part B: ${progs.join('')}`)

function part(arr,a,b){
    let aind = arr.indexOf(a)
    let bind = arr.indexOf(b)
    arr[aind] = b
    arr[bind] = a
}

function exch(arr,a,b){
    let ref = structuredClone(arr)
    arr[a] = ref[b]
    arr[b] = ref[a]
}

function spin(arr, amp){
    amp = arr.length - amp
    let narr = []
    for(let l = amp; l<arr.length + amp; l++){
        let x = l%arr.length
        narr.push(arr[x])
    }
    return narr
}