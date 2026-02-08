import puz from '../input.js'
let codePos = puz.match(/row (?<row>\d+), column (?<col>\d+)/).groups

let code = 20151125

let totRows = +codePos.col + +codePos.row -1
let totCodes = sigma(totRows)
let codeNum = totCodes - (totRows - codePos.col)

do{
    let nc = codeAlgo(code)
    code = nc
    codeNum--
}while(codeNum>1)
console.log(code)

function codeAlgo(pc){
    return (pc*252533)%33554393
}
function sigma(n){
    return (n*(n+1))/2
}