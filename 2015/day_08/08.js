import puz from "../../input.js"
const input = puz.split("\n")

let totdif = 0

for (var line of input){
    let strlength = line.length
    new Function(`code = ${line}`)()
    let codelength = code.length
    totdif += (strlength - codelength)
}
console.log("Part A: ",totdif)

totdif = 0
for (var line of input){
    let strlength = line.length
    if(line.match(/\\(?!"\S)/g) == null){var one = 0}
    else {var one = line.match(/\\(?!"\S)/g).length}
    if(line.match(/(")/g) == null){var two = 0}
    else {var two = line.match(/(")/g).length}
    let codelength = line.length + one + 2*two
    totdif += (codelength - strlength)
}
console.log("Part B: ",totdif)