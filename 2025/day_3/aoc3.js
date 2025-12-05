console.time('time')
import { readFileSync } from 'node:fs';

//var input = readFileSync("./test.txt", "utf8");
var input = readFileSync("./input.txt", "utf8");
var banks = input.split("\n")










/* First Attempt

let joltageTotal = 0

console.log(banks)

banks.forEach(srch)

console.log(joltageTotal)

function srch(item){
    let int1 = null
    let int2 = null
    let int3 = null
    let int4 = null
    let int5 = null
    let int6 = null
    let int7 = null
    let int8 = null
    let int9 = null
    let int10 = null
    let int11 = null
    let int12 = null
    
    for (let x = 9; x > 0; x--){
        int1 = item.indexOf(x)
        if (int1!=-1 && int1<(item.length - 11)){
            console.log(int1, item[int1])
            break}
    }
    
    for (let x = 9; x > 0; x--){
        int2 = item.indexOf(x, int1+1)
        if (int2 !=-1 && int2<(item.length - 10)){
            console.log(int2,item[int2])
            break
        }
    }

    for (let x = 9; x > 0; x--){
        int3 = item.indexOf(x, int2+1)
        if (int3 !=-1 && int3<(item.length - 9)){
            console.log(int3,item[int3])
            break
        }
    }

    for (let x = 9; x > 0; x--){
        int4 = item.indexOf(x, int3+1)
        if (int4 !=-1 && int4<(item.length - 8)){
            console.log(int4,item[int4])
            break
        }
    }

    for (let x = 9; x > 0; x--){
        int5 = item.indexOf(x, int4+1)
        if (int5 !=-1 && int5<(item.length - 7)){
            console.log(int5,item[int5])
            break
        }
    }

    for (let x = 9; x > 0; x--){
        int6 = item.indexOf(x, int5+1)
        if (int6 !=-1 && int6<(item.length - 6)){
            console.log(int6,item[int6])
            break
        }
    }

    for (let x = 9; x > 0; x--){
        int7 = item.indexOf(x, int6+1)
        if (int7 !=-1 && int7<(item.length - 5)){
            console.log(int7,item[int7])
            break
        }
    }

    for (let x = 9; x > 0; x--){
        int8 = item.indexOf(x, int7+1)
        if (int8 !=-1 && int8<(item.length - 4)){
            console.log(int8,item[int8])
            break
        }
    }

    for (let x = 9; x > 0; x--){
        int9 = item.indexOf(x, int8+1)
        if (int9 !=-1 && int9<(item.length - 3)){
            console.log(int9,item[int9])
            break
        }
    }

    for (let x = 9; x > 0; x--){
        int10 = item.indexOf(x, int9+1)
        if (int10 !=-1 && int10<(item.length - 2)){
            console.log(int10,item[int10])
            break
        }
    }

    for (let x = 9; x > 0; x--){
        int11 = item.indexOf(x, int10+1)
        if (int11 !=-1 && int11<(item.length-1)){
            console.log(int11,item[int11])
            break
        }
    }

    for (let x = 9; x > 0; x--){
        int12 = item.indexOf(x, int11+1)
        if (int12 !=-1){
            console.log(int12,item[int12])
            break
        }
    }
    
    let joltage = Number(item[int1].concat("", item[int2], item[int3], item[int4], item[int5], item[int6], item[int7], item[int8], item[int9], item[int10], item[int11], item[int12]))
    console.log(joltage)
    joltageTotal += joltage
}
*/

console.timeEnd('time')

