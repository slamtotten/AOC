import puz from '../../input.js'
let input = puz.split("\n")
let fav = +input[0]
let goal = input[1]

class Queue {
    constructor() {
        this.items = {};
        this.head = 0;
        this.tail = 0;
    }
    
    nq(item) {
        this.items[this.tail] = item;
        this.tail++;
    }
    
    dq() {
        if (this.isEmpty()) return undefined;
        const item = this.items[this.head];
        delete this.items[this.head];
        this.head++;
        return item;
    }
    
    isEmpty() {
        return this.tail - this.head === 0;
    }
}

let startA = [1,1,0]
shortPath(startA,goal)

let startB = [1,1,0,[]]
let visTot = []
uniqueLocs(startB)
console.log(`Part B: ${visTot.length} unique locations`)

function shortPath(start, goal){
    let [visited, q] = [[],new Queue()]
    q.nq(start)
    while(!q.isEmpty()){
        let [x,y,steps] = q.dq()
        let coordString = [x,y].toString()
        if(visited.includes(coordString)){continue}
        visited.push(coordString)
        if(coordString === goal){console.log(`Part A: Minimum steps to ${goal}: ${steps}`);break}
        if(x-1 > 0 && findMap(x-1,y) == 'open'){q.nq([x-1,y,steps+1])}
        if(findMap(x+1,y) == 'open'){q.nq([x+1,y,steps+1])}
        if(y-1 > 0 && findMap(x,y-1) == 'open'){q.nq([x,y-1,steps+1])}
        if(findMap(x,y+1) == 'open'){q.nq([x,y+1,steps+1])}
    }
}

function uniqueLocs(pos){
    let [x,y,steps,vis] = pos
    if(steps > 50){return}
    let nvis = structuredClone(vis)
    let coordString = [x,y].toString()
    if(!visTot.includes(coordString)){visTot.push(coordString)}
    if(nvis.includes(coordString)){return}
    else{nvis.push(coordString)}
    if(x > 0 && findMap(x-1,y) == 'open'){uniqueLocs([x-1,y,steps+1,nvis])}
    if(findMap(x+1,y) == 'open'){uniqueLocs([x+1,y,steps+1,nvis])}
    if(y > 0 && findMap(x,y-1) == 'open'){uniqueLocs([x,y-1,steps+1,nvis])}
    if(findMap(x,y+1) == 'open'){uniqueLocs([x,y+1,steps+1,nvis])}
}

function findMap(x,y){
    let sum = x*x + 3*x + 2*x*y + y + y*y + fav
    if (sum.toString(2).match(/1/g).length%2 == 0){return 'open'}else{return 'wall'}
}