import puz from '../../input.js'
let pws = puz.split('\n')

let validpws = 0
for (let pw of pws){
    let valid = true
    let words = pw.match(/(\w+)/g)

    //Part B
    words = words.map(r=> r.split('').sort().join(''))

    for(let i = 0; i < words.length; i++){
        for(let ii = 0; ii < words.length; ii++){
            if (i == ii){continue}
            if (words[i] === words[ii]){valid = false}
        }
    }
    if(valid == true){validpws++}
}

console.log(validpws)