import puz from '../../input.js'
let input = puz.split('\n')

class Disc{
    constructor(id, size, initpos){
        this.id = id
        this.size = size
        this.initpos = initpos
        this.curpos = initpos
    }

    getPos(time){
        this.curpos = (time + this.initpos)%this.size
        return this.curpos
    }
}

let discs = []
for (let line of input){
    let x = line.match(/Disc #(?<id>\d+) has (?<size>\d+) positions; at time=0, it is at position (?<initpos>\d+)/).groups
    discs.push(new Disc(+x.id, +x.size, +x.initpos))
}

//Part B
discs.push(new Disc(7,11,0))

for (let i = 0; ;i++){
    let time = i
    let thru = true
    for(let disc of discs){
        time++
        if(disc.getPos(time) != 0){thru = false;break}
    }
    if(thru == true){console.log(`${i} Seconds`);break}
}