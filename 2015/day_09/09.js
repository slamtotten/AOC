import puz from "../../input.js"
let distances = puz.split("\n").map(r => r.split(" "))
distances.forEach(r => {r.splice(1,1); r.splice(2,1); r[2] = +r[2]})

let locations = []
for(var line of distances){
    if (locations.includes(line[0])){}
    else {locations.push(line[0])}
    if (locations.includes(line[1])){}
    else {locations.push(line[1])}
}

var routedist = []
for(var location of locations){  
    let steps = 0
    let totdist = 0
    let destinations = locations.filter(r => r != location)
    routesearch(location, destinations, steps+1, totdist)
}

routedist.sort((a,b)=>a-b)
console.log("Part A: Shortest route ",routedist.shift())
routedist.sort((a,b)=>b-a)
console.log("Part B: Longest route ",routedist.shift())

function routesearch(start, destinations, steps, totdist){  
    for(var location of destinations){      
        let distance = finddist(start,location) 
        if (steps == locations.length-1){routedist.push(totdist+distance)}
        let newdest = destinations.filter(r => r != location)
        routesearch(location, newdest, steps +1, totdist + distance)          
    }
}

function finddist(strt,end){
    for(var route of distances){
        if(route.includes(strt) && route.includes(end)){return route[2]}
    }

}