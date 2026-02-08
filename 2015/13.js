import puz from '../input.js'
let input = puz.split("\n")

const [chart,attendees] = [[],[]]
for(let line of input){
    let val = line.match(/(?<pers1>\w+) would (?<vec>gain|lose) (?<hap>\d+) happiness units by sitting next to (?<pers2>\w+)/).groups
    if(val.vec == "lose"){val.hap = +val.hap * -1}
    else{val.hap = +val.hap}
    chart.push({pers1:val.pers1, hap:val.hap, pers2:val.pers2})
    if (!attendees.includes(val.pers1)){attendees.push(val.pers1)}
}

//Part B
attendees.forEach(r => chart.push({pers1:"You", hap:0, pers2:r}))
attendees.push("You")

const totalHappiness = []
seatArrs(attendees[0], attendees.filter(x=>x!=attendees[0]), 0, attendees[0])
totalHappiness.sort((a,b)=>b-a)
console.log("Optimal happiness:",totalHappiness.shift())

function seatArrs(start, attendees, tothap, init){
    for(let attendee of attendees){
    let remattendees = attendees.filter(r=>r!=attendee)
    let hap = findHap(start,attendee)
    if (remattendees.length == 0){
        let hap2 = findHap(init, attendee)
        totalHappiness.push(tothap+hap+hap2)}
    seatArrs(attendee, remattendees, tothap+hap, init)
    }
}

function findHap(a,b){
    let hap = 0
    let x = chart.find(r=>r.pers1 == a && r.pers2 == b) ?? {hap:0}
    let y = chart.find(r=>r.pers1 == b && r.pers2 == a) ?? {hap:0}
    hap += x.hap + y.hap
    return hap
}