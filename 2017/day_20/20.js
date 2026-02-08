import puz from '../../input.js'
let input = puz.split('\n')

class Particle{
    constructor(id,px,py,pz,vx,vy,vz,ax,ay,az){
        this.id = id
        this.pos = [px,py,pz]
        this.vel = [vx,vy,vz]
        this.acc = [ax,ay,az]
        this.dist = 0
    }
    getDist(){
        this.dist = this.pos.reduce((a,b)=> Math.abs(a) + Math.abs(b))
    }
}

let partsA = []
for(let i = 0; i<input.length;i++){
    let x = input[i].match(/p=<(?<px>-?\d+),(?<py>-?\d+),(?<pz>-?\d+)>, v=<(?<vx>-?\d+),(?<vy>-?\d+),(?<vz>-?\d+)>, a=<(?<ax>-?\d+),(?<ay>-?\d+),(?<az>-?\d+)>/).groups
    partsA.push(new Particle(i,+x.px,+x.py,+x.pz,+x.vx,+x.vy,+x.vz,+x.ax,+x.ay,+x.az))
}
let partsB = structuredClone(partsA)
let ticks = 100
while(ticks>0){
    for(let p of partsA){
        p.vel = [p.vel[0] + p.acc[0], p.vel[1] + p.acc[1], p.vel[2] + p.acc[2]]
        p.pos = [p.pos[0] + p.vel[0], p.pos[1] + p.vel[1], p.pos[2] + p.vel[2]]
    }
}
partsA.forEach(r=>r.getDist())
partsA.sort((a,b)=> a.dist - b.dist)
console.log(`Part A: ${partsA.shift()}`)

ticks = 100
while (ticks>0){
    for(let p of partsB){
        p.vel = [p.vel[0] + p.acc[0], p.vel[1] + p.acc[1], p.vel[2] + p.acc[2]]
        p.pos = [p.pos[0] + p.vel[0], p.pos[1] + p.vel[1], p.pos[2] + p.vel[2]]
    }
    let posArr = []
    for(let p of partsB){
        let match = false
        for(let pr of partsB.filter(r=>r.id != p.id)){
            if(p.pos.toString() == pr.pos.toString()){match = true;break}
        }
        if(match == false){posArr.push(p)}
    }
    partsB = posArr
    ticks--
}
console.log(`Part B: ${partsB.length}`)