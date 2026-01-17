import puz from '../../input.js'
const rooms = puz.split('\n').map(r=>r.split('-'))

let sectot = 0

for(let room of rooms){
    let x = room.pop().match(/(?<sec>\d+)\[(?<checksum>\w+)\]/).groups
    let letters = []
    for(let seq of room){letters = letters.concat(seq.split(''))}
    let y = letters.sort().join('').match(/(\w)(\1+)?/g).sort((a,b)=>b.length-a.length)
    let chksum = ''
    for(let lt of y){chksum += lt[0]}
    if(chksum.substring(0,5) == x.checksum){sectot += +x.sec}

    let name = ''
    for (let seq of room){
        for (let i = 0; i < seq.length; i++){
            let n = seq.charCodeAt(i) + +x.sec%26
            if(n>122){n = 97 + (n-123)}
            let l = String.fromCharCode(n)
            name += l
        }
        name += ' '
    }
    if(name.search('north') != -1){console.log(name, x.sec)}
}
console.log(`Part A: ${sectot}`)