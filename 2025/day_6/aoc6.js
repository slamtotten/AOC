import { readFileSync } from "fs";

//Part A

//var sheet = readFileSync("test.txt","utf8").split("\n").map(r => r.split(" ").filter(r=>r !==""))
var sheet = readFileSync("input.txt","utf8").split("\n").map(r => r.split(" ").filter(r=>r !==""))

var ops = sheet.pop()
var sheet = turnSheet(sheet)

var total = 0

for(let i = 0; i<sheet.length;i++){
    if(ops[i]=="+"){
        let ans = sheet[i].reduce(sum)
        total += ans
    }else if(ops[i]=="*"){
        let ans = sheet[i].reduce(mult)
        total += ans
    }
}
console.log("Part A: ",total)

//Part B

//var sheet = readFileSync("test.txt","utf8").split("\n").map(r => r.split(""))
var sheet = readFileSync("input.txt","utf8").split("\n").map(r => r.split(""))

var ops = sheet.pop()
var eqLngth = ops.join("").split(/\S/).map(r => r.length)

eqLngth.shift()
eqLngth[eqLngth.length-1]++
ops = ops.filter(r=>/\S/.test(r))
sheet = turnSheet(sheet).map(r => r.reduce(comb).trim()).filter(r => /\S/.test(r))

let newsheet = []
let opid =0
let i=0
do{ let prob = sheet.slice(i,i+eqLngth[opid])
    newsheet.push(prob)
    i+=eqLngth[opid]
    opid++
} while (opid<ops.length)

var total = 0
for(let i = 0; i<newsheet.length;i++){
    if(ops[i]=="+"){
        let ans = newsheet[i].reduce(sum)
        total += ans
    }else if(ops[i]=="*"){
        let ans = newsheet[i].reduce(mult)
        total += ans
    }
}
console.log("Part B: ",total)

function sum(sum, int){
    return +sum + +int
}
function mult(mult, int){
    return +mult * +int
}
function comb(total, int){
    return total + int
}
function turnSheet(arr){
    let turnedArray = []
    for(let x = 0; x<arr[0].length; x++){
        turnedArray.push(arr.map(r =>r[x]))
    }
    return turnedArray
}
