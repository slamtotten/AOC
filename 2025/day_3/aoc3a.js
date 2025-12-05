console.time()
import { readFileSync } from 'node:fs';

//var banks = readFileSync("./test.txt", "utf8").split("\n");
var banks = readFileSync("./input.txt", "utf8").split("\n");

let joltageTotal = 0

console.log(banks)

banks.forEach(srch)

console.log(joltageTotal)

function srch(item){
    let int1 = null
    let int2 = null
    
    for (let x = 9; x > 0; x--){
        int1 = item.indexOf(x)
        if (int1!=-1 && int1<(item.length - 1)){
            console.log(int1, item[int1])
            break}
    }
    
    for (let x = 9; x > 0; x--){
        int2 = item.indexOf(x, int1+1)
        if (int2 !=-1){
            console.log(int2,item[int2])
            break
        }
    }

    let joltage = (item[int1] += item[int2])
    console.log(joltage)
    joltageTotal += joltage
}

console.timeEnd()


//    for (let y = 9; y >=0; y--){
//        let int2 = item.search(y)
//        if (int2>=0 && int2>int1){continue}
//    }
//    console.log(int1,int2)
