import puz from '../../input.js'
let ranges = puz.split("\n").map(r => r.split("-").map(r=>+r))

do{ 
    let d = 0
    ranges.sort((a,b) => (a[0]-b[0]))
    const cndRng = []
    for(let r=0; r<ranges.length; r++){
        if (r+1==ranges.length){cndRng.push(ranges[r])}
        else if (ranges[r+1][0]<=ranges[r][1] && ranges[r][1]<=ranges[r+1][1]){
            cndRng.push([ranges[r][0],ranges[r+1][1]])
            r++
        }else if (ranges[r+1][0]<=ranges[r][1] && ranges[r][1]>ranges[r+1][1]){
            cndRng.push(ranges[r])
            r++
        }else{cndRng.push(ranges[r])}
    }
    d += ranges.length-cndRng.length
    ranges = structuredClone(cndRng)
}while(d>0)

let totalIps = 4294967296

for(let i = 0; i<totalIps;i++){
    if(chkRng(i) == true){console.log(`Part A: ${i}`);break}
}

for(let range of cndRng){
    let blocked = range.reduce((a,b)=>b-a) + 1
    totalIps -= blocked
}
console.log(`Part B: ${totalIps}`)

function chkRng(ip){
    for (let range of cndRng){
        if (ip >= range[0] && ip <= range[1]){
            return false
        }
    }
    return true
}