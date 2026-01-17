import puz from '../../input.js'
let seq = puz.split('\n')

let keypad = [[1,2,3],[4,5,6],[7,8,9]]
let [y,x] = [1,1]
let code = ''

for(let line of seq){
    for(let i = 0;i<line.length;i++){
        if(line[i] == 'U'){y = Math.max(y-1,0)}
        if(line[i] == 'R'){x = Math.min(x+1,2)}
        if(line[i] == 'D'){y = Math.min(y+1,2)}
        if(line[i] == 'L'){x = Math.max(x-1,0)}
    }
    code += keypad[y][x]
}
console.log(`Part A: ${code}`)

keypad = [['','',1,'',''],['',2,3,4,''],[5,6,7,8,9],['','A','B','C',''],['','','D','','']]
y = 2
x = 0
code = ''

for(let line of seq){
    for(let i = 0;i<line.length;i++){
        let limY = Math.abs(2 - x)
        let limX = Math.abs(2 - y)
        if(line[i] == 'U'){y = Math.max(y-1, limY-0)}
        if(line[i] == 'R'){x = Math.min(x+1, 4-limX)}
        if(line[i] == 'D'){y = Math.min(y+1, 4-limY)}
        if(line[i] == 'L'){x = Math.max(x-1, limX-0)}
    }
    code += keypad[y][x]
}
console.log(`Part B: ${code}`)