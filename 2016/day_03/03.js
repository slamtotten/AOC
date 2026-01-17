import puz from '../../input.js'
let trisA = puz.split('\n').map(r=> r.split(' ').filter(r=>r!=='').map(r=> +r))
let trisB = structuredClone(trisA)

let valid = []

for(let tri of trisA){
    tri.sort((a,b) => a-b)
    if(+tri[0] + +tri[1] > +tri[2]){valid.push(tri)}
}

console.log(`Part A: ${valid.length}`)

let [r1,r2,r3,vb] = [[],[],[],[]]

for (let tri of trisB){
    r1.push(tri[0])
    r2.push(tri[1])
    r3.push(tri[2])
}

vertTri(r1)
vertTri(r2)
vertTri(r3)
console.log(`Part B: ${vb.length}`)

function vertTri(row){
    while(row.length>0){
        let tri = row.splice(0,3).sort((a,b)=>a-b)
        if(tri[0]+tri[1]>tri[2]){vb.push(tri)}
    }
}


