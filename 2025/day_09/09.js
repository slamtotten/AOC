import puz from "../../input.js"
var coord = puz.split("\n").map(r=>r.split(","))

//Part A
var areas = []
var cc = 0
while(cc<coord.length){
    for (let x = cc+1; x<coord.length ;x++){
        let a = area(coord[cc][0],coord[cc][1],coord[x][0],coord[x][1])
        areas.push([cc,x,a])
    }
    cc++
}

areas = areas.sort((a,b)=> b[2]-a[2])
console.log(areas[0][2])

function area(x1,y1,x2,y2){
    return (Math.abs(x2 - x1)+1) * (Math.abs(y2 - y1)+1)
}
function distance(x1,y1,x2,y2){
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2)
}

//Part B
var seqpair = []
var cc = 0
while(cc<coord.length-1){
    let x = cc+1
    let d = distance(coord[cc][0],coord[cc][1],coord[x][0],coord[x][1])
    seqpair.push([cc,x,d])
    cc++
}
seqpair = seqpair.sort((a,b)=> b[2]-a[2])
console.log(seqpair[0], seqpair[1])
console.log("Coord A: ",coord[seqpair[0][0]], "Coord B: ", coord[seqpair[0][1]])
console.log("Coord A: ",coord[seqpair[1][0]], "Coord B: ", coord[seqpair[1][1]])

let keycoord1 = coord[seqpair[0][0]]
let keycoord2 = coord[seqpair[1][1]]

var half1 = coord.filter(r => +r[1]<+keycoord1[1])
var half2 = coord.filter(r => +r[1]>+keycoord2[1])

half1 = half1.sort((a,b) => Math.abs(keycoord1[0]-a[0])-Math.abs(keycoord1[0]-b[0]))
half2 = half2.sort((a,b) => Math.abs(keycoord2[0]-a[0])- Math.abs(keycoord2[0]-b[0]))

console.log(half2)

const ch1 = half1.filter(r => +r[1] >= +half1[0][1])
const ch2 = half2.filter(r => +r[1] <= +half2[0][1])



var bareas = []
for (let x = 0; x<ch1.length ;x++){
        let a = area(keycoord1[0],keycoord1[1],ch1[x][0],ch1[x][1])
        bareas.push([ch1[x],a])
    }
for (let x = 0; x<ch2.length ;x++){    
        let a = area(keycoord2[0],keycoord2[1],ch2[x][0],ch2[x][1])
        bareas.push([ch2[x],a])
}
bareas = bareas.sort((a,b)=> b[1]-a[1])
console.log(keycoord2)
console.log(bareas)