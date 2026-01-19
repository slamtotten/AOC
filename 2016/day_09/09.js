import seq from '../../input.js'

let algSrch = /\((\d+)x(\d+)\)/
console.log(`Part A: ${firstDecomp(seq)}`)
console.log(`Part B: ${fullDecomp(seq)}`)


function firstDecomp(str){
    let startPos = 0
    let strlength = 0
    do{
        let remdata = str.substring(startPos)
        let data = remdata.match(algSrch)
        if(data == null){ strlength += remdata.length; break}
        if(data.index > 0){strlength += data.index}
        strlength += +data[1] * +data[2]
        startPos += +data[1] + +data[0].length + data.index
    }while(str[startPos] != undefined)
    return strlength
}

function fullDecomp (str){
    let strlength = 0
    let startPos = 0
    do{
        let remdata = str.substring(startPos)
        let data = remdata.match(algSrch)
        if(data == null){strlength += remdata.length; break}
        if(data.index > 0){strlength += data.index}
        let substring = data.input.slice(data.index + data[0].length, +data[1] + +data[0].length + +data.index)
        if(substring.match(algSrch)==null){strlength += +data[1] * +data[2]}
        else{strlength += fullDecomp(substring) * data[2]}
        startPos += +data[1] + +data[0].length + data.index
    }while(str[startPos] != undefined)
    return strlength
}