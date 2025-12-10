import puz from "../../input.js"
const input = puz.split("\n").map(r =>r.split(" "))

//Separate goals array
const goalsraw = []
input.forEach(r => {goalsraw.push(r.shift()); r.pop()})

//convert goals to binary
const goals = []
goalsraw.forEach(r=>{
    let n = r.substring(1,(r.length-1))
    let n2 = ""
    for(let x = 0; x<n.length; x++){
        if (n[x] == "#"){n2+="1"}else{n2+="0"}
    }
    goals.push(parseInt(n2,2))
})
console.log(goals)

//Buttons to binary
const buttons = []
for(let i = 0; i < input.length; i++){
    let btnarr= []
    for(let ii = 0; ii <input[i].length; ii++){ 
        //console.log(btn2bin(input[i][ii], i))
        btnarr.push(parseInt(btn2bin(input[i][ii], i),2))
    }
    buttons.push(btnarr)
}

console.table(buttons)

//Functions
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
function recurse(button,buttons,steps){
    if (steps > 15){return false}
    
}

/*
//Classes (Tree nodes)
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
    */