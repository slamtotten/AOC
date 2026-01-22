import puz from '../../input.js'
let input = puz.split('\n')

let regs = {a: 0, b: 0, c: 1, d: 0}

run(parseInsts(input))

console.log(regs.a)

function parseInsts(arr){
    let io = {}
    for (let i = 0; i<arr.length;i++){
        let x = arr[i].match(/(?<func>\w+)\s(?<a>\d+|\w)\s?(?<b>-?\d+|\w)?/).groups
        io[i] = {func: x.func, a: x.a, b: x.b}
    }
    return io
}

function run(instructions){
    for (let i = 0; i<input.length;i++){
        let inst = instructions[i]
        if (inst.func == "inc"){regs[inst.a]++}
        if (inst.func == "dec"){regs[inst.a]--}
        if (inst.func == "jnz"){if (regs[inst.a] != 0){i += (+inst.b - 1)}}
        if (inst.func == "cpy"){
            if(inst.a.match(/(\d)/) == null){
                regs[inst.b] = regs[inst.a]
            }else{
                regs[inst.b] = +inst.a
            }
        }
    }
}