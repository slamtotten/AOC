import puz from '../../input.js'
let input = puz

for(let i = 0; i<input.length;i++){
    if(input[i] == '!'){
        let x = input.split('')
        x.splice(i,2)
        input = x.join('')
        i--
    }
}

let garbage = input.match(/<\S*?>/g)
let totgarb = 0
if(garbage != null){
    for(let garb of garbage){
        totgarb += garb.length - 2
        let x = input.replace(garb,'')
        input = x
    }
}

let [nest,total] = [0,0]
for (let i = 0; i <input.length; i++){
    if(input[i]== '{'){nest++}
    if(input[i]== '}'){
        total += nest
        nest--
    }
}
console.log(`Part A: ${total}`)
console.log(`Part B: ${totgarb}`)