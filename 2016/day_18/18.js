import input from '../../input.js'

let [line,floor,partA,partB] = [input,[],40,400000]

while(floor.length < partB){
    let nxt = ''
    for(let i = 0; i < line.length; i++){
        let a = line[i-1] ?? '.'
        let b = line[i+1] ?? '.'
        if(a === b){nxt += '.'}else{nxt += '^'}
    }
    floor.push(line)
    line = nxt
}

console.table(floor)
console.log(count(floor,'.'))

function count(arr, tgt){
    let safeTiles = 0
    for(let line of arr){
        for(let c = 0; c<line.length;c++){
            if(line[c] == tgt){safeTiles++}
        }
    }
    return safeTiles
}

