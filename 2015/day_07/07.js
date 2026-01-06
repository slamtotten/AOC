import puz from "../../input.js"
var seq = puz.split("\n").map(r => r.split(" -> "))

const variables = new Map()
seq.forEach(r => variables.set(r[1], r[0]))

const bitop = ["&", "|", "~", "<<", ">>>"]
variables.forEach((v,k) => operators(v,k))

const partA = structuredClone(variables)
const partB = structuredClone(variables)

let start = "a"
console.log("a signal is: ",simplify(start, partA))
partB.set("b", simplify(start,partA))
console.log("a signal is: ",simplify(start, partB))

function simplify(strt, map){
    let val = map.get(strt)
    if(Array.isArray(val) == true){
        for(let i = 0; i<val.length; i++){
            if(bitop.includes(val[i])){continue}
            else if (map.has(val[i])){
                val[i] = simplify(val[i], map)
            }   
        }
        val = eval(val.reduce((a,b)=> a + " " + b))
        return val
    }else if(map.has(val)){
        val = simplify(val, map)
        return val
    } else {return val}
}

function operators(v,k){
    if(v.includes("AND") == true){
        v = v.replace("AND", "&")
        variables.set(k,v.split(" "))
    }
    else if(v.includes("OR") == true){
        v = v.replace("OR", "|")
        variables.set(k,v.split(" "))
    }
    else if(v.includes("NOT") == true){
        v = v.replace("NOT", "~")
        variables.set(k,v.split(" "))
    }
    else if(v.includes("LSHIFT") == true){
        v = v.replace("LSHIFT", "<<")
        variables.set(k,v.split(" "))
    }
    else if(v.includes("RSHIFT") == true){
        v = v.replace("RSHIFT", ">>>")
        variables.set(k,v.split(" "))
    }
}