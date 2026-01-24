import puz from '../../input.js'
let insts = puz.split('\n')


for(let i = 0; ;i++){
let regs = {a: i, b: 0, c: 0, d: 0}

let objinsts = parseInsts(insts)
let sig = run(objinsts, regs)
if(sig == '0101010101'){console.log(i);break}
}

function parseInsts(arr){
    let io = {}
    for (let i = 0; i<arr.length;i++){
        let x = arr[i].match(/(?<func>\w+)\s(?<a>-?\d+|\w)\s?(?<b>-?\d+|\w)?/).groups
        io[i] = {func: x.func, a: x.a, b: x.b}
    }
    return io
}

function run(instructions, regs){
    let signal = ''
    for (let i = 0; i<insts.length;i++){
        let inst = instructions[i]
        if (inst.func == "inc"){regs[inst.a]++}
        if (inst.func == "dec"){regs[inst.a]--}
        if (inst.func == "jnz"){
            let ref = regs[inst.a] ?? +inst.a
            let steps = regs[inst.b] ?? +inst.b
            if(ref != 0){i += steps - 1}}
        if (inst.func == "cpy"){
            let src = regs[inst.a] ?? +inst.a
            regs[inst.b] = src
        }
        if (inst.func == 'tgl'){
            let tgtinst = instructions[i + regs[inst.a]]
            if (tgtinst == undefined){continue}
            if (tgtinst.b == undefined){if(tgtinst.func == 'inc'){tgtinst.func = 'dec'}else{tgtinst.func = 'inc'}}
            else{if(tgtinst.func == 'jnz'){tgtinst.func = 'cpy'}else{tgtinst.func = 'jnz'}}
        }
        if (inst.func == 'out'){signal += regs[inst.a]}
        if (signal.length == 10){return signal}
    }
}