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