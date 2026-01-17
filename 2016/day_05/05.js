import md5 from "md5"
import input from '../../input.js'

let codeA = ''
for(let x = 0; ;x++){
    let hash = md5(input+x)
    if (hash.substring(0,5) == '00000'){codeA += hash[5]}
    if (codeA.length == 8){break}
}

let codeB = ['','','','','','','','']
for(let x = 0; ;x++){
    let hash = md5(input+x)
    if (hash.substring(0,5) == '00000'){
        let pos = hash[5]
        if (pos.match(/[0-7]/)==null){continue}
        let char = hash[6]
        if (codeB[pos] == ''){codeB[pos] = char}
    }
    if (!codeB.includes('')){break}
}
console.log(`Part A: ${codeA}`)
console.log(`Part B: ${codeB.join('')}`)