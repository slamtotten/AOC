import input from '../../input.js'

let partA = 272
let partB = 35651584
let disksize = partA

let a = input
while(a.length<disksize){
    let b = a.split('').reverse().map(r=> {if(r == '0'){return '1'}else{return '0'}}).join('')
    a = a + '0' + b
}
let data = a.substring(0,disksize)

while(data.length%2 == 0){
    let checksum = ''
    for(let i = 0; i <data.length; i += 2){
        if(data[i] == data[i+1]){checksum += '1'}else{checksum += '0'}
    }
    data = checksum
}
console.log(`Checksum: ${data}`)