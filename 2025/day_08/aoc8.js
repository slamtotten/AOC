import { readFileSync } from "fs"
var input = readFileSync("input.txt","utf8").split("\n").map(r=>r.split(",").map(r=>+r))
//var input = readFileSync("test.txt","utf8").split("\n").map(r=>r.split(",").map(r=>+r))

//Part A
//Calculate and log distances between all points
var distances = []
var cc = 0
while(cc<input.length){
    for (let x = cc+1; x<input.length;x++){
        let d = dist(input[cc][0],input[cc][1],input[cc][2],input[x][0],input[x][1],input[x][2])
        distances.push([cc,x,d])
    }
    cc++
}

//Sort pairs by distance, collect shortest pairs
distances = distances.sort((a,b)=> a[2]-b[2])
var circuits = structuredClone(distances).slice(0,1000)
for(var line of circuits){line.pop()}

//Condense pairs into connected circuits
do{ let sl = circuits.length
    condense(circuits)
    let el = circuits.length
    var removed = sl-el
}while (removed>0)

//Find largest 3 and multiply lengths
circuits = circuits.sort((a,b)=> b.length - a.length)
console.log("Part A: ",(circuits[0].length*circuits[1].length*circuits[2].length))

function dist(x1,y1,z1,x2,y2,z2){
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2 + (z2-z1)**2)
}

function condense(arr){
    for(let id = 0; id<arr.length; id++){
        for (let x = arr.length-1; x>id; x--){
            if(arr[x].some(v => arr[id].includes(v)) == true){
                arr[id].push(...arr[x])
                arr.splice(x,1)
            }
        }
    arr[id] = arr[id].reduce((a,b) => {if(!a.includes(b)){a.push(b)}return a},[])
    }
}

//Part B

var connections = structuredClone(distances)
for(var line of connections){line.pop()}

//Creates list of junction box id's, each in their own array
var jblist = []
for (let x = 0; x < input.length; x++){
    jblist.push([x])
}

//Combines junction box arrays one by one until there is only 1
for (var x = 0;;x++){
    let a = connections[x][0]
    let b = connections[x][1]
    let id1 = jblist.findIndex((r => r.includes(a)))
    let id2 = jblist.findIndex((r => r.includes(b)))
    if (id1 == id2){x++; continue}
    jblist[id1].push(...jblist[id2])
    jblist.splice(id2,1)
    if (jblist.length==1){break}
}  
//Multiply X coordinates of final connection nodes
console.log("Part B: ",(input[connections[x][0]][0]*input[connections[x][1]][0]))