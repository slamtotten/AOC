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

const graph = new Map()
for(let i = 0; i <input.length;i++){
    graph.set(input[i], output[i])
}

const visited = new Map()

let pathsA = chkpath(graph, "svr", "fft", visited)
visited.clear()

let pathsB = chkpath(graph, "fft", "dac", visited)
visited.clear()

let pathsC = chkpath(graph, "dac", "out", visited)

console.log(pathsA*pathsB*pathsC)

function chkpath(graph, start, end, visited){
    if (start == end){return 1}
    else if (visited.has(start) == true){return visited.get(start).sol}
    else if(start == "out"){return false}
    else {
        let total = 0
        graph.get(start).forEach(str=> total += chkpath(graph, str, end, visited))
        visited.set(start,{sol: total})
        return total}
}