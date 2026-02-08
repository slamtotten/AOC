import puz from '../input.js'
let input = puz.split('\n')

let regs = {a: 0, b: 0}
run(parseInsts(input))
console.log(regs.b)

function parseInsts(arr){
    let io = {}
    for (let i = 0; i<arr.length;i++){
        let x = arr[i].match(/(?<func>\w+)\s(?:(?<reg>\w)(?:,)?)?\s?(?<offset>(?:-|\+)\d+)?/).groups
        io[i] = {func: x.func, reg: x.reg, offset: +x.offset}
    }
    return io
}

function run(instructions){
    for (let i = 0; i<input.length;i++){
        let inst = instructions[i]
        if (inst.func == "hlf"){regs[inst.reg]/=2}
        if (inst.func == "tpl"){regs[inst.reg]*=3}
        if (inst.func == "inc"){regs[inst.reg]++}
        if (inst.func == "jmp"){i += (inst.offset-1)}
        if (inst.func == "jie"){if (regs[inst.reg]%2 === 0){i += (inst.offset-1)}}
        if (inst.func == "jio"){if (regs[inst.reg] === 1){i += (inst.offset-1)}}
    }
}

