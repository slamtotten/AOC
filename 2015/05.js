import puz from "../input.js"
var input = puz.split("\n")

let ns = 0
for(let line of input){if(chkVwl(line) && chkDbl(line) && chkSp(line)){ns++}}
console.log(`Part A: ${ns}`)

function chkVwl(str){let vowels = str.match(/[aeiou]/g) ?? 0; if(vowels.length>=3){return true}}
function chkDbl(str){if(str.match(/([a-z])\1/) != null){return true}}
function chkSp(str){if(str.match(/(ab|cd|pq|xy)/) == null){return true}}

ns = 0
for(var line of input){if(cnd1(line) && cnd2(line)){ns++}}
console.log(`Part B: ${ns}`)

function cnd1(str){if(str.search(/([a-z])([a-z])[a-z]*\1\2/) != -1){return true}}
function cnd2(str){if(str.search(/([a-z])([a-z])\1/) != -1){return true}}
