import puz from '../input.js'
let pkgs = puz.split('\n').map(r=>+r)

let gw = pkgs.reduce((a,b)=> a + b)/4
let sols = []
reduction(pkgs)
let qe = sols.sort((a,b) => a.length - b.length).filter(r=>r.length == sols[0].length).map(r=>r.reduce((a,b)=>a*b))
console.log(qe.sort((a,b)=>a-b).shift())

function reduction(bank){
    let [group,checked,loops] = [[],[],0]  
    do {
        bank.sort((a,b)=>b-a)        
        bank.push(bank.splice(loops-1,1)[0])
        do{          
            do{group.push(bank.shift())}while(group.reduce((a,b)=>a+b)<gw && bank.length>0)
            console.log(group)
            if(group.reduce((a,b)=>a+b)== gw){
                let newSol = structuredClone(group.sort((a,b)=>b-a))
                if(!arrInc(newSol,sols)){sols.push(newSol);checked.push(group.pop())}
            }
            else {checked.push(group.pop())}
        }while(bank.length>0)
        while(checked.length >0){bank.push(checked.shift())}
        while(group.length >0){bank.push(group.shift())}
        loops++
    }while(sols.length<5)
}

function arrInc(arr, aoa){
    for(let match of aoa){if(arr.toString() === match.toString()){return true}}
    return false
}