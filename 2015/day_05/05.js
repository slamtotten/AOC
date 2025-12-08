import puz from "../../input.js"
var input = puz.split("\n")

//Part A
var ns = 0
for(var line of input){
    if(chkVwl(line) == true && chkDbl(line) == true && chkSp(line) == false){ns++}
    }
console.log("Nice Strings: ",ns)

function chkVwl(str){
    var vowels = str.split("").filter(r=>/[aeiou]/g.test(r))
    if(vowels.length>=3){return true}else{return false}
}
function chkDbl(str){
    if(str.search(/([a-z])\1/) != -1){return true}else{return false}
}
function chkSp(str){
    if(str.search(/(ab|cd|pq|xy)/) != -1){return true}else{return false}
}
console.log("Part A: ", ns)

//Part B

var ns = 0
for(var line of input){
    if(cnd1(line) == true && cnd2(line) == true){ns++}
    }
console.log("Part B: ",ns)

function cnd1(str){
    if(str.search(/([a-z])([a-z])([a-z]+)?\1\2/) != -1){return true}else{return false}
}
function cnd2(str){
    if(str.search(/([a-z])([a-z])\1/) != -1){return true}else{return false}
}
