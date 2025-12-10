import puz from "../../input.js"
var seq = puz.split("\n")

console.log(seq.sort((a,b)=> a.toLowerCase().localeCompare(b.toLowerCase())))