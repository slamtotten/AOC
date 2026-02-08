import puz from "../input.js"
let input = puz.split('\n')

const distances = []
for(let line of input){
    let x = line.match(/(?<org>\w+) to (?<dest>\w+) = (?<dist>\d+)/).groups
    distances.push({org:x.org, dest:x.dest, dist:+x.dist})
    distances.push({org:x.dest, dest:x.org, dist:+x.dist})
}

const locations = []
for(let trip of distances){
    if (!locations.includes(trip.org)){locations.push(trip.org)}
}

const routedist = []
for(let location of locations){  
    let dests = locations.filter(r => r != location)
    routesearch(location, dests, 1, 0)
}

routedist.sort((a,b)=>a-b)
console.log("Part A: Shortest route ",routedist.shift())
console.log("Part B: Longest route ",routedist.pop())

function routesearch(start, dests, steps, totdist){  
    for(var dest of dests){      
        let distance = finddist(start,dest) 
        if (steps == locations.length-1){routedist.push(totdist+distance)}
        let newdest = dests.filter(r => r != dest)
        routesearch(dest, newdest, steps +1, totdist + distance)          
    }
}

function finddist(strt,end){
        let dist = distances.find(r=> r.org == strt && r.dest == end)
        return dist.dist
}