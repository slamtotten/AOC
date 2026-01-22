import puz from '../../input.js'
let input = puz.split('\n\n')
let inputA = input[0].split('\n')
let inputB = input[1].split('\n')

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

let [floorsA, goalA] = setup(inputA)
let [floorsB, goalB] = setup(inputB)

move(floorsA,goalA)
move(floorsB,goalB)

function setup(arr){
    let floors = []
    let goalArr = [[],[],[],[]]
    for(let line of arr){
        let floor = []
        let gens = line.matchAll(/(\w+) generator/g)
        let mc = line.matchAll(/(\w+)-compatible microchip/g)
        gens.forEach(r => {floor.push({type:'gen', id:r[1]}); goalArr[3].push({type:'gen', id:r[1]})})
        mc.forEach(r => {floor.push({type:'mc', id:r[1]}); goalArr[3].push({type:'mc', id:r[1]})})
        floors.push(floor)
    }
    floors.forEach(r => r.sort((a,b)=> a.type.localeCompare(b.type) || a.id.localeCompare(b.id)))
    goalArr.forEach(r => r.sort((a,b)=> a.type.localeCompare(b.type) || a.id.localeCompare(b.id)))
    let goal = JSON.stringify(goalArr)
    return [floors,goal]
}

function move (arr, goal){
    let q = new Queue()
    let visited = []
    q.nq([arr, 0, 0, ''])
    while(!q.isEmpty()){
        let [floors, pos, steps, prevDir] = q.dq()
        if(checkValid(floors) == false){continue}
        if (floors[0].length > 0 && steps>8){continue}
        floors.forEach(r => r.sort((a,b)=> a.type.localeCompare(b.type) || a.id.localeCompare(b.id)))
        let vstring = JSON.stringify([floors,pos])
        if(visited.includes(vstring)){continue}
        visited.push(vstring)
        if (JSON.stringify(floors) == goal){console.log(`Minimum Steps: ${steps}`);console.log(floors);break}
        if (pos < 3){
            for (let i = 0; i < floors[pos].length; i++){
                let nfloors = structuredClone(floors)
                nfloors[pos+1] = nfloors[pos+1].concat(nfloors[pos].splice(i,1))
                q.nq([nfloors, pos+1,steps+1,'up'])
                if(nfloors[pos].length>0){
                    for (let ii = 0; ii < nfloors[pos].length; ii++){
                        let nnfloors = structuredClone(nfloors)
                        nnfloors[pos+1] = nnfloors[pos+1].concat(nnfloors[pos].splice(ii,1))
                        q.nq([nnfloors,pos+1,steps+1, 'up'])
                    }
                }
            }
        }
        if (pos > 0){
            for (let d = 0; d < floors[pos].length; d++){
                let nfloors = structuredClone(floors)
                nfloors[pos-1] = nfloors[pos-1].concat(nfloors[pos].splice(d,1))
                q.nq([nfloors, pos-1,steps+1, 'dn'])
                if(nfloors[pos].length>0 && prevDir == 'up'){
                    for (let ii = 0; ii < nfloors[pos].length; ii++){
                        let nnfloors = structuredClone(nfloors)
                        nnfloors[pos-1] = nnfloors[pos-1].concat(nnfloors[pos].splice(ii,1))
                        q.nq([nnfloors,pos-1,steps+1, 'dn'])
                    }
                }
            }
        }
    }
}

function checkValid(floors){
    let valid = true
    for(let floor of floors){
        if(floor.some(r => r.type == 'mc') && floor.some(r=> r.type == 'gen')){
            let chips = floor.filter(r => r.type == 'mc')
            chips.forEach(r => {if(floor.some(i => (i.type == 'gen' && i.id == r.id)) == false){valid = false}})
        }
    }
    return valid
}