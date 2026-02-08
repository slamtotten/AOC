import {readFileSync} from 'fs'
const options = readFileSync('16.txt','utf-8').split('\n')
const sample = readFileSync('16test.txt','utf-8').split('\n')

let target = {}
getProps(target, sample)

let sues = []
for(let line of options){
    let sue = {}
    let num = line.match(/Sue (\d+)/).slice(1).shift()
    sue.num = num
    let props = line.split(",")
    getProps(sue, props)
    sues.push(sue)
}

sues.forEach(r =>{
    if(chkMatchA(r) == true){console.log("Part A:",r.num)}
    if(chkMatchB(r) == true){console.log("Part B:",r.num)}
})
    
function chkMatchA(sue){
    for(let key in sue){
        if(key == "num"){continue}
        if(sue[key] != target[key]){return false}
    }
    return true
}

function chkMatchB(sue){
    for(let key in sue){
        if(key == "num"){continue}
        if(key == "cats"||key =="trees"){
            if(+sue[key] <= +target[key]){return false}
        }
        else if(key == "goldfish"||key == "pomeranians"){
            if(+sue[key] >= +target[key]){return false}
        }
        else if(sue[key] != target[key]){return false}
    }
    return true
}

function getProps(target, arr){
    for(let line of arr){
        let x = line.match(/(?<key>\w+): (?<val>\d+)/).groups
        target[x.key] = x.val
    }
}