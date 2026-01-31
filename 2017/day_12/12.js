import puz from '../../input.js'
let input = puz.split('\n')

let map = []
for(let line of input){
    let x = line.match(/(?<id>\d+) <-> (?<adj>\d+(, \d+)*)/).groups
    x.adj = x.adj.split(',').map(r=>r.trim())
    map.push({id:x.id, adj: x.adj, checked: 'no'})
}

let groups = []
for(let i = 0;i < map.length;i++){
    if (map[i].checked == 'yes'){continue}
    let visited = []
    search(map[i],visited)
    groups.push(visited)
}

console.log(`Part A: ${groups[0].length}`)
console.log(`Part B: ${groups.length}`)

function search(prog,visited){
    if(!visited.includes(prog.id)){visited.push(prog.id); prog.checked = 'yes'}
    else{return}
    prog.adj.forEach(r=> search(map[r],visited))
}
