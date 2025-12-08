console.time()
import puz from "../../input.js"
var input = puz

/*  part 1
var up ="("
var dn =")"

let count = 0
let pos = 0

while ((pos = input.indexOf(up, pos)) !== -1){
    count++
    pos += up.length;
}

while ((pos = input.indexOf(dn, pos)) !== -1){
    count--
    pos += dn.length;
}
console.log(count);
*/

// part 2
let floor = 0
for (let ind = 0; ind < input.length; ind++){
    
    if (input[ind] == "("){
        floor++
        console.log(floor)
    } else if (input[ind] == ")"){
        floor--
        console.log(floor)
        if (floor < 0){
            console.log(ind+1);
            break
        }
    }
}
console.timeEnd()