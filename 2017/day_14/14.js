import puz from '../../input.js'

let grid = []
for(let i = 0; i < 128; i++){
    let input = puz + '-' + i
    let lengths = []
    for(let b = 0; b<input.length;b++){
        lengths.push(input.charCodeAt(b))
    }
    let bsuffix = [17,31,73,47,23]
    lengths = lengths.concat(bsuffix)

    let [skip,pos,loops] = [0,0,64]
    let list = []
    for(let x = 0; x<256;x++){
        list.push(x)
    }
    while(loops>0){
        for(let length of lengths){
            list = rot(list,pos)
            let newlist = list.splice(0,+length).reverse()
            list.splice(0,0,...newlist)
            list = rot(list,list.length - +pos)
            pos = (pos + +length + skip)%list.length
            skip++
        }
        loops--
    }
    grid.push(hex2Bin(hexHash(list)))
}
symGrid(grid)
console.log(`Part A: ${count(grid)}`)
let rg = regionGen()
countReg(grid)

function countReg(arr){
    let reg = 0
    for(let y = 0; y <arr.length;y++){
        for(let x = 0;x<arr[y].length;x++){
            if(arr[y][x] == '#'){
                reg = rg.next()
                arr[y][x] = reg.value
                adjChck(arr,x,y,reg.value)
            }
        }
    }
    console.log(`Part B: ${reg.value}`)
}

function adjChck(arr, x, y, reg){
    if(arr[y-1]!=undefined){if(arr[y-1][x] == '#'){arr[y-1][x] = reg; adjChck(arr,x,y-1,reg)}}
    if(arr[y+1]!=undefined){if(arr[y+1][x] == '#'){arr[y+1][x] = reg; adjChck(arr,x,y+1,reg)}}
    if(arr[y][x-1]!=undefined){if(arr[y][x-1] == '#'){arr[y][x-1] = reg; adjChck(arr,x-1,y,reg)}}
    if(arr[y][x+1]!=undefined){if(arr[y][x+1] == '#'){arr[y][x+1] = reg; adjChck(arr,x+1,y,reg)}}
}

function * regionGen (){
    for(let i = 1; ;i++)
        yield i
}

function symGrid(arr){
    for(let y = 0; y <arr.length;y++){
        for(let x = 0;x<arr[y].length;x++){
            if(arr[y][x] == '1'){arr[y][x] = '#'}
            else(arr[y][x] = '.')
        }
    }
}

function count(arr){
    let count = 0
    for(let y = 0; y <arr.length;y++){
        for(let x = 0;x<arr[y].length;x++){
            if(arr[y][x] == '#'){count++}
        }
    }
    return count
}

function rot(arr, amp){
    let narr = []
    for(let l = amp; l<arr.length + amp; l++){
        let x = l%arr.length
        narr.push(arr[x])
    }
    return narr
}

function hexHash(arr){
    let denseHash = []
    while(arr.length>0){
        let chunk = arr.splice(0,16).reduce((a,b)=>+a ^ +b).toString(16)
        if(chunk.length==1){chunk = '0'+chunk}
        denseHash.push(chunk)
    }
    return denseHash.join('')
}

function hex2Bin(hexstr){
    let binArr = []
    for(let i = 0; i<hexstr.length;i++){
        let bin = Number.parseInt(hexstr[i],16).toString(2)
        while(bin.length<4){
            bin = '0' + bin
        }
        binArr.push(bin)
    }
    return binArr.join('').split('')
}