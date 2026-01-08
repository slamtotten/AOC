import puz from '../../input.js'
let input = puz.split("\n")

class Reindeer {
    constructor(name, rate, duration, rest) {
        this.name = name
        this.rate = rate
        this.duration = duration
        this.rest = rest
        this.dcur = duration
        this.rcur = rest
        this.distance = 0
        this.points = 0
    }
    run(){
        if(this.dcur>0){this.distance += this.rate; this.dcur--}
        else {
            if(this.rcur>1){this.rcur--}
            else{this.dcur = this.duration; this.rcur = this.rest}
        }
    }
}

let stable = []
for(let line of input){
    let x = line.match(/^(?<name>\w+) can fly (?<rate>\d+) km\/s for (?<duration>\d+) seconds, but then must rest for (?<rest>\d+) seconds./).groups
    let rd = new Reindeer(x.name, +x.rate, +x.duration, +x.rest)
    stable.push(rd)
}   

let raceduration = 2503
while(raceduration>0){
    stable.forEach(r => r.run())
    stable.sort((a,b)=>b.distance-a.distance)
    let lead = stable[0].distance
    stable.forEach(r => {if(r.distance == lead){r.points++}})
    raceduration--
}

stable.sort((a,b)=>b.distance-a.distance)
console.log("Part A: Winning Reindeer:",stable[0].name, stable[0].distance)
stable.sort((a,b)=>b.points-a.points)
console.log("Part B: Winning Reindeer:",stable[0].name, stable[0].points)

