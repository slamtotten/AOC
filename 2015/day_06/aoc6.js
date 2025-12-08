import { readFileSync } from "fs";

var input = readFileSync("input.txt","utf8").split("\n").map(r => r.split(" "))
//var input = readFileSync("test.txt","utf8").split("\n").map(r => r.split(" "))

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
        line.push(" ")
        gridwidth--
    }
    grid.push(line)
    gridheight--
}

//Process operations
for(let seq = 0; seq < ops.length; seq++){
    if(ops[seq] == "on"){
        on(sc[seq][0], sc[seq][1], ec[seq][0], ec[seq][1]) 
        console.log(ops[seq], sc[seq], ec[seq])
        console.log(count(grid))
    }else if(ops[seq] == "off"){
        off(sc[seq][0], sc[seq][1], ec[seq][0], ec[seq][1])
        console.log(ops[seq], sc[seq], ec[seq])
        console.log(count(grid))
    } else {
        toggle(sc[seq][0], sc[seq][1], ec[seq][0], ec[seq][1])
        console.log(ops[seq], sc[seq], ec[seq])
        console.log(count(grid))
    }  
}

//Count lights
function count(arr){
    var lights = 0
    for(var line of arr){
        for (let x = 0; x <line.length; x++)
            if (line[x]!==" "){lights++}
    }
    return lights
}


function on(x1, y1, x2, y2){
    if(x2>=x1){var sx=x1;var ex=x2}else{var sx=x2;var ex=x1}
    if(y2>=y1){var sy=y1;var ey=y2}else{var sy=y2;var ey=y1}
    for(let y = sy; y <=ey; y++){
        for(let x = sx; x <=ex; x++){
           grid[y][x] = "@" 
        }
    }    
}
function off(x1, y1, x2, y2){
    if(x2>=x1){var sx=x1;var ex=x2}else{var sx=x2;var ex=x1}
    if(y2>=y1){var sy=y1;var ey=y2}else{var sy=y2;var ey=y1}
    for(let y = sy; y <=ey; y++){
        for(let x = sx; x <=ex; x++){
           grid[y][x] = " " 
        }
    }
}
function toggle(x1, y1, x2, y2){
    if(x2>=x1){var sx=x1;var ex=x2}else{var sx=x2;var ex=x1}
    if(y2>=y1){var sy=y1;var ey=y2}else{var sy=y2;var ey=y1}
    for(let y = sy; y <=ey; y++){
        for(let x = sx; x <=ex; x++){
           if(grid[y][x] == " "){
            grid[y][x] = "@"
           } else{ grid[y][x] = " "}
        }
    }   
}