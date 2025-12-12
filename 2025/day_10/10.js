//Import puzzle input
import puz from "../../input.js"
const input = puz.split("\n").map(r =>r.split(" "))

//Separate goals, button, and joltage into separate arrays
const goalsraw = []
const joltage = []
input.forEach(r => {goalsraw.push(r.shift()); joltage.push(r.pop())})

//Convert goals to binary
const goals = []
goalsraw.forEach(r=>{
    let n = r.substring(1,(r.length-1))
    let n2 = ""
    for(let x = 0; x<n.length; x++){
        if (n[x] == "#"){n2+="1"}else{n2+="0"}
    }
    goals.push(parseInt(n2,2))
})

//Convert buttons -> binary -> decimal
const buttons = []
for(let i = 0; i < input.length; i++){
    let btnarr= []
    for(let ii = 0; ii <input[i].length; ii++){ 
        btnarr.push(binCon(input[i][ii], goalsraw[i].length-2))
    }
    buttons.push(btnarr)
}

//Process button iterations
const totans = []
for(let prob = 0; prob < input.length; prob++){
    let ans = []
    let status = 0

    buttons[prob].forEach(button => recurse(button,buttons[prob],status,1,prob,ans))
    ans.sort((a,b)=>a-b)
    console.log(prob, ans[0])
    totans.push(ans[0])
}

//Total button presses
let total = 0
totans.forEach(r => total+=r)
console.log(total)

//Functions
function binCon(str, length){
    let n = str.substring(1,(str.length-1))
    let dec = 0
    for(let x = 0; x<n.length; x++){
        if (n[x]== ","){continue}
        let digit = 2**((length-1) - n[x])
        dec += digit
    }
    return dec
}

function recurse(button, buttons, status, steps, prob, ans){
    ans.sort((a,b)=> a-b)
    if (steps >= ans[0]){return false}
    status = status ^ button
    //console.log(button, status, steps)
    if (status == goals[prob]){ans.push(steps);return false}
    buttons = buttons.filter(r =>r!=button)
    buttons.forEach(button => {recurse(button,buttons, status, steps+1, prob, ans)})
}

//Save for part b maybe
/*
function btn2bin(str, ind){
    var b = []
    let ints = (goalsraw[ind].length-2)
    while (ints>0){b.push(0);ints--}
    let braw = str.substring(1,str.length-1)
    for(let x = 0; x <braw.length; x++){
        if (braw[x]== ","){continue}
        b[braw[x]]++
    }
    return b.join("")
}
*/