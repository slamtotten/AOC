console.time()
import pkg from "md5"; const md5 = pkg

let input = "yzbqklnj"
let digits = 5

let zeros = ""
let remdigits = digits
while (remdigits >0){
    zeros+="0"
    remdigits--
}

for(let x = 0; ;x++){
    let firstseq = md5(input+x).substring(0,digits)
    if (firstseq == zeros){
        console.log(x)
        break
    }
}
console.timeEnd()