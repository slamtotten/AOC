console.time()
import puz from '../../input.js'
let input = puz.split('\n\n')
let repMap = input[0].split('\n').map(r => {let x = r.split(' => ');x.push(1);return {key: x[0],rep:x[1],steps:x[2]}})
let molecule = input[1]

console.log(`Part A: ${calibrate(repMap)} molecules`)

function calibrate(map){
    let newMolecules = []
    for(let seq of map){
        let matches = findMatches(seq.key, molecule)
        if (matches != null){
            for (let match of matches){
                let newMol = replace(molecule, seq.rep, seq.key.length, match)
                if (newMolecules.includes(newMol)!=true){newMolecules.push(newMol)}
            }
        }    
    }
    return newMolecules.length
}

function replace(str, rep, lngth, ind){
    let x = str.split("")
    x.splice(ind,lngth,rep)
    return x.reduce((a,b) => a+b)
}

function findMatches(seq, targetString){
    return targetString.matchAll(seq).map(r=>r.index)       
}

console.timeEnd()