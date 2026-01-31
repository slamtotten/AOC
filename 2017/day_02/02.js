import puz from '../../input.js'
let spreadsheet = puz.split('\n').map(r=>r.split('\t'))

let [difs,divs] = [[],[]]
for(let arr of spreadsheet){
    arr.sort((a,b)=> b-a)
    difs.push(+arr[0] - +arr[arr.length-1])
    arr.forEach(r=>{
        for(let i = 0; i<arr.length;i++){
            if(arr[i] == r){continue}
            if(r%arr[i] == 0){divs.push(r/arr[i])}
        }
    })
}
console.log(`Part A: ${difs.reduce((a,b)=>a+b)}`)
console.log(`Part B: ${divs.reduce((a,b)=>a+b)}`)