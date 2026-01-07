import input from "../../input.js"

do{
input = incrStr(input, input.length-1,)
var valid = chkCond(input)
}while(valid == false)
console.log("Part A: ",input)

do{
input = incrStr(input, input.length-1,)
var valid = chkCond(input)
}while(valid == false)
console.log("Part B: ", input)

function incrStr(str, pos){
    let newstr = setCharAt(str,pos,nxtChar(str,pos))
    if (newstr[pos] == "a"){newstr = incrStr(newstr, pos-1)}
    return newstr
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function nxtChar(str, pos){
    if(str[pos] == "z"){return "a"}
    return String.fromCharCode(str.charCodeAt(pos)+1)
}

function chkCond(str){
    let cond1 = str.search(/(abc|bcd|cde|def|efg|fgh|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/g)
    let cond2 = str.search(/(o|i|l)/g)
    let cond3 = str.match(/([a-z])\1/g)
    if (cond3 == null){return false}
    if(cond1 != -1 && cond2 == -1 && cond3.length >= 2){return true}
    else {return false}
}