console.time()
import puz from '../input.js'
let input = puz.split('\n\n')
let repMap = input[0].split('\n').map(r => {let x = r.split(' => ');x.push(1);return {key: x[0],rep:x[1],steps:x[2]}})
let molecule = input[1]

console.log(`Part A: ${calibrate(repMap)} molecules`)

let map = condense(filterMap(repMap, molecule),2)
console.log(`Molecule created in ${reduceMol(molecule, map, 0, [],[]).sort((a,b)=>a-b).shift()} steps.`)

//Part A
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

//Part B
function reduceMol(curMol, map, steps, solSteps, visited){
    for(let seq of map){
        let matches = findMatches(seq.rep, curMol)
        if(matches != null){
        for (let match of matches){
            let newMol = replace(curMol, seq.key, seq.rep.length, match)
            //console.log(newMol)
            if (newMol == 'e'){solSteps.push(steps+seq.steps);break}
            else {
                if(visited.includes(newMol)==false){
                visited.push(newMol)
                reduceMol(newMol, map, steps + seq.steps,solSteps,visited)
                }
            }
        }
        }
        if(solSteps.length>0){break}
    }
    return solSteps
}

//<---------------------utility functions--------------------------->
function replace(str, rep, lngth, ind){
    let x = str.split("")
    x.splice(ind,lngth,rep)
    return x.reduce((a,b) => a+b)
}

function findMatches(seq, targetString){
    return targetString.matchAll(seq).map(r=>r.index)       
}

function filterMap(map, target){
    let filtMap = []
    let molArr = target.match(/([A-Z][a-z]?)/g)
    let keyArr = map.map(r=>r.key)
    for(let seq of map){
        let strayElems = []
        let seqElems = seq.rep.match(/([A-Z][a-z]?)/g)
        for (let elem of seqElems){
            if(molArr.includes(elem)==false && keyArr.includes(elem)==false){strayElems.push(elem)}
        }
        if (strayElems.length == 0){filtMap.push(seq)}
    }
    return filtMap
}

function condense(map, cycles){
    let mapB = structuredClone(map)
    while(cycles>0){
        let strMap = []
        mapB.forEach(r=>{
            map.forEach(e=>{
                let matches = findMatches(e.key,r.rep)
                if(matches != null){
                    for(let match of matches){
                        let newMol = [r.key,replace(r.rep,e.rep,e.key.length,match),r.steps+e.steps].toString()
                        if(strMap.includes(newMol) == false){strMap.push(newMol)}
                    }
                }
                
            })
        })
        mapB = strMap.map(r => {let x = r.split(','); x[2] = +x[2]; return {key:x[0],rep:x[1],steps:x[2]}})
        cycles--
    }
    return mapB.concat(map)
}

console.timeEnd()