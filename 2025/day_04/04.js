import puz from "../../input.js"
var map = puz.split("\n").map(r=>r.split(""))

//Part A

var roll = "@"
var total = 0

for( let row = 0; row < map.length; row++){
        let ids = scnRow(row)
        for (var id of ids){
            if (adjChk(row, id) < 4) {
                total++
            }   
        }
    }
 console.log("Part A: ",total, " accessible rolls.")

//Part B

total = 0

do {var currentrolls = 0
    for( let row = 0; row<map.length; row++){
        let ids = scnRow(row)
        for (var id of ids){
            if (adjChk(row, id) < 4) {
                map[row][id] = "X"
                total++
                currentrolls++
            }   
        }
    }
} while (currentrolls > 0)

console.log("Part B: ",total, " accessible rolls." )
console.timeEnd('time')

function scnRow(row){
    let rollId =[]
    for (let id = 0; id < map[row].length; id++){
        if (map[row][id] != roll){continue}
        rollId.push(id)
    }
    return rollId
}

function adjChk(row, id){
    let adjroll = 0
    for (let y = -1; y <=1; y++){
        for (let x = -1; x<=1; x++){
            if (x==0 && y==0){continue}
            if (row+y<0||row+y>=map.length||id+x<0||id+x>row.length){continue}
            if (map[row+y][id+x] == roll){adjroll++}
        }
    } 
    return adjroll
}