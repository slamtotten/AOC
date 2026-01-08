import puz from '../../input.js'
let input = puz.split("\n")

let stable = []
for(let line of input){
    let x = line.match(/^(?<name>\w+) can fly (?<rate>\d+) km\/s for (?<duration>\d+) seconds, but then must rest for (?<rest>\d+) seconds./).groups
    let rd = new Reindeer(x.name, +x.rate, +x.duration, +x.rest)
    stable.push(rd)
}   

let raceduration = 2503
for(let i = 0; i<raceduration;i++){
    for(let reindeer of stable){
        if(reindeer.dcur>0){reindeer.distance += reindeer.rate; reindeer.dcur--}
            else {
                if(reindeer.rcur>1){reindeer.rcur--}
                else{reindeer.dcur = reindeer.duration; reindeer.rcur = reindeer.rest}
            }
    }
    stable.sort((a,b)=>b.distance-a.distance)
    let lead = stable[0].distance
    for(let reindeer of stable){
        if (reindeer.distance == lead){reindeer.points++}
    }
}
stable.sort((a,b)=>b.distance-a.distance)
console.log("Part A: Winning Reindeer:",stable[0].name, stable[0].distance)
stable.sort((a,b)=>b.points-a.points)
console.log("Part B: Winning Reindeer:",stable[0].name, stable[0].points)

function Reindeer(name, rate, duration, rest){
    this.name = name
    this.rate = rate
    this.duration = duration
    this.rest = rest
    this.dcur = duration
    this.rcur = rest
    this.distance = 0
    this.points = 0
}