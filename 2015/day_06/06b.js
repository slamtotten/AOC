import puz from "../../input.js"
var input = puz.split("\n").map(r => r.split(" "))

//input parsing
var ops = []
var sc = []
var ec = []
for(var line of input){
    if (line[0] == "turn"){line.shift()}
    line.splice(2,1)
    ops.push(line.shift())
    sc.push(line.shift().split(","))
    ec.push(line.shift().split(","))
}

// Create light grid
let gridsize = 1000
var grid = []

let gridheight = gridsize
while(gridheight>0){
    let line = []
    let gridwidth = gridsize
    while(gridwidth>0){
        line.push(0)
        gridwidth--
    }
    grid.push(line)
    gridheight--
}

//Process operations
for(let seq = 0; seq < ops.length; seq++){
    if(ops[seq] == "on"){
        on(sc[seq][0], sc[seq][1], ec[seq][0], ec[seq][1]) 
    }else if(ops[seq] == "off"){
        off(sc[seq][0], sc[seq][1], ec[seq][0], ec[seq][1])
    } else {
        toggle(sc[seq][0], sc[seq][1], ec[seq][0], ec[seq][1])
    }  
}

//Count lights
function count(arr){
    var lights = 0
    for(var line of arr){
        for (let x = 0; x <line.length; x++){
            lights += line[x]
        }
    }
    return lights
}
console.log(count(grid))

function on(x1, y1, x2, y2){
    for(let y = +Math.min(y1,y2); y <= +Math.max(y1,y2); y++){
        for(let x = +Math.min(x1,x2); x <= +Math.max(x1,x2); x++){
            grid[y][x]++ 
        }
    }    
}
function off(x1, y1, x2, y2){
    for(let y = +Math.min(y1,y2); y <= +Math.max(y1,y2); y++){
        for(let x = +Math.min(x1,x2); x <= +Math.max(x1,x2); x++){
            if(grid[y][x]==0){continue}
            grid[y][x]-- 
        }
    }
}
function toggle(x1, y1, x2, y2){
    for(let y = +Math.min(y1,y2); y <= +Math.max(y1,y2); y++){
        for(let x = +Math.min(x1,x2); x <= +Math.max(x1,x2); x++){
            grid[y][x]+= 2
        }
    }   
}