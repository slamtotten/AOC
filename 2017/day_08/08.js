import puz from '../../input.js'
let insts = puz.split('\n')

let [regids,objinsts] = [[],[]]
for(let line of insts){
    let x = line.match(/(?<reg>\w+) (?<func>\w+) (?<val>-?\d+) if (?<ref>\w+) (?<comp>[<>=!]+) (?<refval>-?\d+)/).groups
    objinsts.push({reg: x.reg, func:x.func, val:+x.val, ref:x.ref, comp:x.comp, refval:+x.refval})
    if(!regids.includes(x.reg)){regids.push(x.reg)}
    if(!regids.includes(x.ref)){regids.push(x.ref)}
}

let regs = {}
for(let id of regids){
    regs[id] = 0
}

let highval = 0
for(let inst of objinsts){
    if (!new Function(`return ${regs[inst.ref]}${inst.comp}${inst.refval}`)()){continue}
    if(inst.func == 'inc'){regs[inst.reg] += inst.val}
    if(inst.func == 'dec'){regs[inst.reg] -= inst.val}
    let chv = Object.values(regs).sort((a,b)=>b-a).shift()
    if(chv>highval){highval = chv}
}

console.log(`Part A: ${Object.values(regs).sort((a,b)=>b-a).shift()}`)
console.log(`Part B: ${highval}`)