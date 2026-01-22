import md5 from 'md5'
import input from '../../input.js'

let [keys,hashes] = [[],[]]
let hg = hashGen()

for(let i = 0; ;i++){
    if(hashes[i] == undefined){hashes.push(hg.next().value)}
    let hash = hashes[i]
    let match = hash.match(/(\w)\1\1/)
    if (match != null){
        let five = new RegExp(`(${match[1]})\\1\\1\\1\\1`)
        for(let ii = i+1; ii < i+1000; ii++){
            if(hashes[ii] == undefined){hashes.push(hg.next().value)}
            let hash2 = hashes[ii]
            if(hash2.match(five)!=null){keys.push([hashes[i],i]);break}
        }
    }
    if(keys.length == 64){break}
}

console.log(keys.pop())

function * hashGen(){
    for(let i = 0; ;i++){
        let hash = md5(input+i)
        for(let s = 0;s<2016;s++){
            hash = md5(hash)
        } 
        yield hash
    }
}
