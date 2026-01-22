import md5 from "md5"
import puz from '../../input.js'

let paths = []
search([1,1],puz)
console.log(`Part A: ${paths.shift()}`)
paths.sort((a,b)=>b.length-a.length)
console.log(`Part B: ${paths.shift().length}`)

function search(pos, input){
    let q = []
    q.push([pos, input])
    while(q.length>0){
        let [[x,y],input] = q.shift()
        if(x == 4 && y == 4){paths.push(input.substring(puz.length));continue}
        let hash = md5(input).substring(0,4)
        if(hash[0].match(/[bcdef]/) != null && y>1){q.push([[x,y-1], input + 'U'])}
        if(hash[1].match(/[bcdef]/) != null && y<4){q.push([[x,y+1], input + 'D'])}
        if(hash[2].match(/[bcdef]/) != null && x>1){q.push([[x-1,y], input + 'L'])}
        if(hash[3].match(/[bcdef]/) != null && x<4){q.push([[x+1,y], input + 'R'])}
    }
}