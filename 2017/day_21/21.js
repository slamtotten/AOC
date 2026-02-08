import puz from '../../input.js'
let input = puz.split('\n').map(r=>r.split(' => '))

let repMap = new Map()
for(let line of input){
    repMap.set(line[0].split('/').toString(), line[1].split('/'))
}

let grid = ['.#.','..#','###']

let loops = 18
while(loops>0){
    let div = null
    if (grid.length%2 == 0){div = 2}
    else if (grid.length%3 == 0){div = 3}
    let subgrids = (grid.length/div)
    let splitg = splitGrid(grid,subgrids,div)
    let newg = []
    splitg.forEach(r=> newg.push(replace(r,div)))
    grid = joinGrids(newg,subgrids)
    loops--
}
console.log(count(grid))

function count(arr){
    let count = 0
    for(let i = 0; i<arr.length;i++){
        for(let ii = 0; ii<arr[0].length;ii++){
            if(arr[i][ii] == '#'){count++}
        }
    }
    return count
}

function replace(subg,div){
    for(let t = 0; t<=4;t++){
        let gstr = subg.toString()
        if(repMap.has(gstr)){return repMap.get(gstr)}
        else if(t>3){subg= flipGrid(subg); t=-1}
        else {subg = turnGrid(subg,div)}
    }
}

function joinGrids(splitgrid,subgrids){
    let ngrid = []
    for(let i = 0; i < subgrids; i++){
        for(let ii = 0; ii <splitgrid[i].length; ii++){
            let nstr = ''
            for(let iii = i*(subgrids); iii <(i+1)*(subgrids);iii++){
                nstr += splitgrid[iii][ii]
            }
            ngrid.push(nstr)
        }
    }
    return ngrid
}

function splitGrid(grid,subgrids,div){
    let splitgrid = []
    for(let sy = 0; sy < subgrids; sy++){
        for(let sx = 0; sx <subgrids; sx++){
            let subgrid = []
            for(let i = sy*div; i < (sy+1)*div; i++){
                subgrid.push(grid[i].slice(sx*div,(sx+1)*div))
            }
            splitgrid.push(subgrid)
        } 
    }
    return splitgrid
}

function turnGrid(arr,len){
    arr = arr.map(r=>r.split(''))
    let turnedArray = new Array(len)
    for(let x = 0; x<len; x++){
        turnedArray[x] = new Array(len)
    }
    for(let i = 0;i<len;i++){
        for(let j = 0; j<len;j++){
            turnedArray[i][j] = arr[len - j - 1][i]
        }
    }
    return turnedArray.map(r=>r.join(''))
}

function flipGrid(arr){
    arr = arr.map(r=>r.split(''))
    arr.forEach(r=>r.reverse())
    return arr.map(r=>r.join(''))
}