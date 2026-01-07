import puz from '../../input.js'
let data = JSON.parse(puz)

let total = 0
numSearch(data)
console.log("Part A:",total)

total = 0
numSearchRedEx(data)
console.log("Part B:",total)

function numSearch(data){
    for (let key in data){
        if(typeof data[key] == 'number'){total += data[key]}
        else if(typeof data[key] == 'object'){numSearch(data[key])}
        else{continue}
    }
}

function numSearchRedEx(data){
    for (let key in data){
        if(typeof data[key] == 'number'){total += data[key]}
        else if(Array.isArray(data[key]) == true){numSearchRedEx(data[key])}
        else if(typeof data[key] == 'object'){
            let objarr = Object.values(data[key])
            if (objarr.includes("red") == true){continue}
            else{numSearchRedEx(data[key])}          
        }
        else{continue}
    }
}
