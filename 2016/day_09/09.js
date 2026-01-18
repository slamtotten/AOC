import seq from '../../input.js'

let decompA = firstDecomp(seq)
let decompB = fullDecomp(seq)

console.log(`Part A: ${decompA}`)
console.log(`Part B: ${decompB}`)

function firstDecomp(str){
    let startPos = 0
    let strlength = 0
    do{
        let remdata = str.substring(startPos)
        let data = remdata.match(/(?<comp>\((?<chars>\d+)x(?<reps>\d+)\))/)
        if(data == null){ strlength += remdata.length; break}
        if(data.index > 0){strlength += data.index}
        strlength += data.groups.chars * data.groups.reps
        startPos += +data.groups.chars + +data.groups.comp.length + data.index
    }while(str[startPos] != undefined)
    return strlength
}

function fullDecomp (str){
    let strlength = 0
    let startPos = 0
    do{
        let remdata = str.substring(startPos)
        let data = remdata.match(/(?<comp>\((?<chars>\d+)x(?<reps>\d+)\))/)
        if(data == null){strlength += remdata.length; break}
        if(data.index > 0){strlength += data.index}
        let substring = data.input.slice(data.index + data.groups.comp.length, +data.groups.chars + +data.groups.comp.length + +data.index)
        if(substring.match(/(?<comp>\((?<chars>\d+)x(?<reps>\d+)\))/)==null){strlength += data.groups.chars * data.groups.reps}
        else{strlength += fullDecomp(substring) * data.groups.reps}
        startPos += +data.groups.chars + +data.groups.comp.length + data.index
    }while(str[startPos] != undefined)
    return strlength
}