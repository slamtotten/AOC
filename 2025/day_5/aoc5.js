console.time()
import { readFileSync } from "fs";
//var input = readFileSync("test.txt","utf8").split("\n\n")
var input = readFileSync("input.txt","utf8").split("\n\n")
var ranges = input[0].split("\n").map(r => r.split("-").map(r=>+r))
var skus = input[1].split("\n").map(r => +r)

// Part A

let freshSkus = 0
skus.forEach(chkRng)
console.log("Fresh Skus:", freshSkus)

function chkRng(sku){
    for (let r = 0; r<ranges.length; r++){
        if (sku >= ranges[r][0] && sku <= ranges[r][1]){
            freshSkus++
            break
        }
    }
}

// Part B

let total = 0

do{ var d = 0
    ranges.sort((a,b) => (a[0]-b[0]))
    var combinedranges = []

    for(let r=0; r<ranges.length;r++){
        if (r+1==ranges.length){
            combinedranges.push(ranges[r])
        }else if (ranges[r+1][0]<=ranges[r][1] && ranges[r][1]<=ranges[r+1][1]){
            combinedranges.push([ranges[r][0],ranges[r+1][1]])
            r++
        }else if (ranges[r+1][0]<=ranges[r][1] && ranges[r][1]>ranges[r+1][1]){
            combinedranges.push(ranges[r])
            r++
        }else{ combinedranges.push(ranges[r])
        }
    }
    d += ranges.length-combinedranges.length
    console.log("Ranges reduced by:", d)
    ranges = structuredClone(combinedranges)
    console.log(ranges)
    console.log("# of ranges", ranges.length)
}while(d > 0)

for(let range of ranges){total += range[1]-range[0]+1}
console.log(total)
console.timeEnd()