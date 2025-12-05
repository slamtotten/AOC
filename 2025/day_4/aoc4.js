console.time('time')
import { readFileSync } from 'node:fs';

//var input = readFileSync("./test.txt", "utf8");
var input = readFileSync("./input.txt", "utf8");
var map = input.split("\r\n").map(r => r.split(""))

var roll = "@"
var total = 0
var rept = 0

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
    rept++
} while (currentrolls > 0)

console.log(total)
console.log(rept)
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

//Part A Solution

/*var currentrow = 0
var roll = "@"
var total = 0
while (currentrow < rows.length){
    for (let pos = 0; pos < rows[currentrow].length; pos++){
        if (rows[currentrow][pos] == roll){
            let adjroll = 0
            for (let y = -1; y <=1; y++){
                for (let x = -1; x<=1; x++){
                    if (x==0 && y==0){continue}
                    if (currentrow+y<0||currentrow+y>=rows.length||pos+x<0||pos+x>currentrow.length){continue}
                    if (rows[currentrow+y][pos+x] == roll){
                        adjroll++
                    }
                }
            } 
            if (adjroll < 4){
                total++
            }
        }
    } 
    currentrow++
}
console.log(total)
*/