import puz from '../../input.js'
let input = puz.split(',')

let [skip,pos] = [0,0]
let list = []
for (let i = 0; i<256;i++){
    list.push(i)
}

for(let dist of input){
    list = rot(list,pos)
    let newlist = list.splice(0,+dist).reverse()
    list.splice(0,0,...newlist)
    list = rot(list,list.length - +pos)
    pos = (pos + +dist + skip)%list.length
    skip++
}
console.log(`Part A: ${list[0]*list[1]}`)

let inputB = []
for(let b = 0; b<puz.length;b++){
    inputB.push(puz.charCodeAt(b))
}
let bsuffix = [17,31,73,47,23]
inputB = inputB.concat(bsuffix)

let [skipB, posB,loops] = [0,0,64]
let listB = []
for(let x = 0; x<256;x++){
    listB.push(x)
}
while(loops>0){
    for(let dist of inputB){
        listB = rot(listB,posB)
        let newlist = listB.splice(0,+dist).reverse()
        listB.splice(0,0,...newlist)
        listB = rot(listB,listB.length - +posB)
        posB = (posB + +dist + skipB)%listB.length
        skipB++
    }
    loops--
}

let denseHash = []
while(listB.length>0){
    let chunk = listB.splice(0,16).reduce((a,b)=>a^b).toString(16)
    if(chunk.length==1){chunk = '0'+chunk}
    denseHash.push(chunk)
}

console.log(`Part B: ${denseHash.join('')}`)

function rot(arr, amp){
    let narr = []
    for(let l = amp; l<arr.length + amp; l++){
        let x = l%arr.length
        narr.push(arr[x])
    }
    return narr
}