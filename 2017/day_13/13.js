import puz from '../../input.js'
let input = puz.split('\n')

let walls = {}
for(let line of input){
    let x = line.match(/(?<id>\d+): (?<depth>\d+)/).groups
    walls[x.id] = +x.depth
}

let hid = Object.keys(walls).sort((a,b)=>b-a).shift()

for(let w = 0; ;w++){
    let sev = 0
    let caught = false
    for(let i =0; i<=hid; i++){
        if(walls[i] == undefined){continue}
        if(scnPos(i+w, walls[i]) == 0){sev += i * walls[i]; caught = true}
    }
    if(w == 0){console.log(`Part A: ${sev}`)}
    if(caught == false){console.log(`Part B: ${w}`);break}
}

function scnPos(time, depth){
    let scnpos = 0
    let scndir = 'up'
    time = time%(depth + (depth-2))
    while(time > 0){
        if(scndir == 'up'){
            scnpos++
            if(scnpos == depth-1){scndir = 'dn'}
        }
        else if(scndir == 'dn'){
            scnpos--
            if(scnpos == 0){scndir = 'up'}
        }
        time--
    }
    return scnpos
}