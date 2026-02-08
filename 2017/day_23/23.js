import puz from '../../input.js'
let input = puz.split('\n')

let seq = []
for(let line of input){
    let x = line.match(/(?<func>\w+) (?<a>-?\w+) ?(?<b>-?\w+)?/).groups
    seq.push({func:x.func, a:x.a, b:x.b})
}

let regs = {a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0}

let mul = 0
for(let i = 0; i < seq.length; i++){
    if(seq[i].func == 'set'){regs[seq[i].a] = regs[seq[i].b] ?? +seq[i].b}
    if(seq[i].func == 'sub'){regs[seq[i].a] -= regs[seq[i].b] ?? +seq[i].b}
    if(seq[i].func == 'mul'){regs[seq[i].a] *= regs[seq[i].b] ?? +seq[i].b;mul++}
    if(seq[i].func == 'jnz'){let ref = regs[seq[i].a] ?? +seq[i].a; if(ref!=0){i += regs[seq[i].b] ?? +seq[i].b;i--}}
}
console.log(mul)

let h = 0
for(let b = 106700; b<=123700;b+=17){
    if(!primeChk(b)){h++}
}

console.log(h)

function primeChk(num){
    let str = 2
    let lim = Math.sqrt(num)
    while(str <= lim){
        if(num%str++ <1){return false}
    }
    return num>1
}