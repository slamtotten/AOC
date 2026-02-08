import md5 from "md5"
import input from '../input.js'

let digits = 6
let zeros = new Array(digits).fill('0').join('')

for(let x = 0; ;x++){
    if (md5(input+x).substring(0,digits) == zeros){console.log(x); break}
}
