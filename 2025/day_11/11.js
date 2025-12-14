import puz from "../../input.js"
let puzarr = puz.split("\n").map(r =>r.split(" "))

let input = []
let output = []
puzarr.forEach(r => input.push(r.shift().substring(0,3)))
puzarr.map(r => output.push(r))

//Part A

let paths = 0
let start = input.indexOf("you")
chkoutput(start)

function chkoutput(ind){
    output[ind].forEach(str => {
        if (str == "out"){paths++}
        else{chkoutput(input.indexOf(str))}
    })
}

console.log(paths)

//Part B

const visited = new Map()

let pathsA = chkpath("svr", "fft")
visited.clear()

let pathsB = chkpath("fft", "dac")
visited.clear()

let pathsC = chkpath("dac", "out")

console.log(pathsA*pathsB*pathsC)

function chkpath(start, end){
    if (start == end){return 1}
    else if (visited.has(start) == true){return visited.get(start).sol}
    else if(start == "out"){return false}
    else {
        let total = 0
        output[input.indexOf(start)].forEach(str => total += chkpath(str, end))
        visited.set(start,{sol: total})
        return total}
}