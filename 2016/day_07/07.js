import puz from '../../input.js'
let ips = puz.split('\n')

let tls = 0
let ssl = 0
for(let ip of ips){
    if (ip.match(/(\w)(\w)(?<!\1)\2\1/)!= null && ip.match(/\[(?:\w+)?(\w)(\w)(?<!\1)\2\1(?:\w+)?\]/) == null){tls++}
    if (ip.match(/(\w)(?!\1)(\w)\1\w*(\[|\])(?:\w*(\]|\[)\w*(\[|\]))*\w*\2\1\2/) != null){ssl++}
}

console.log(`Part A: ${tls}`)
console.log(`Part B: ${ssl}`)