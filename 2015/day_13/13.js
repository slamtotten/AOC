import puz from '../../input.js'
let input = puz.split("\n")

let chart = []
let attendees = []
for(let line of input){
    let val = line.match(/^(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)/).slice(1)
    if(val[1]=="lose"){val[2] = val[2]*-1;val.splice(1,1)}
    else{val[2] = +val[2];val.splice(1,1)}
    chart.push(val)
    if (attendees.includes(val[0]) == false){attendees.push(val[0])}
}

//Part B
attendees.forEach(r => chart.push(["You", 0, r]))
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
    for(let line of chart){
        if (line.includes(a) == true && line.includes(b) == true){hap += line[1]}
    }
    return hap
}