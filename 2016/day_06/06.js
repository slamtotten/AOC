import puz from '../../input.js'
let sequence = puz.split('\n')

let columns = []
for (let i = 0; i<sequence[0].length;i++){columns.push([])}

for(let line of sequence){
    for (let i = 0; i <line.length; i++){columns[i].push(line[i])}
}

let msgA = ''
let msgB = ''
for(let col of columns){
    col.sort()
    let charA = col.join('').match(/(\w)(\1+)?/g).sort((a,b)=>b.length - a.length).shift()[0]
    let charB = col.join('').match(/(\w)(\1+)?/g).sort((a,b)=>a.length - b.length).shift()[0]
    msgA +=charA
    msgB += charB
}
console.log(`Part A: ${msgA}`)
console.log(`Part B: ${msgB}`)