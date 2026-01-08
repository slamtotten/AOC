import puz from '../../input.js'
let input = puz.split('\n')

class Ingredient{
    constructor(name,cap,dur,flv,txt,cal){
        this.name = name
        this.cap = cap
        this.dur = dur
        this.flv = flv
        this.txt = txt
        this.cal = cal
    }
}
    
const ingredients = []
for(let line of input){
    let x = line.match(/(?<name>\w+): capacity (?<cap>-?\d+), durability (?<dur>-?\d+), flavor (?<flv>-?\d+), texture (?<txt>-?\d+), calories (?<cal>-?\d+)/).groups
    let ing = new Ingredient(x.name,+x.cap,+x.dur,+x.flv,+x.txt,+x.cal)
    ingredients.push(ing)
}

let coefs = []
for(let a = 0; a<=100;a++){
    for(let b = 0; b<=100-a;b++){
        for(let c = 0;c<=100-a-b;c++){
            let d = 100-a-b-c
            coefs.push([a,b,c,d])
        }
    }
}

let scores = []
for(let combo of coefs){
    let [cal,cap,dur,flv,txt] = [0,0,0,0,0]
    for(let i = 0; i<ingredients.length;i++){
        cal += combo[i]*ingredients[i].cal
        cap += combo[i]*ingredients[i].cap
        dur += combo[i]*ingredients[i].dur
        flv += combo[i]*ingredients[i].flv
        txt += combo[i]*ingredients[i].txt
    }
    if (cal != 500){continue}
    if (cap < 0){cap = 0}
    if (dur < 0){dur = 0}
    if (flv < 0){flv = 0}
    if (txt < 0){txt = 0}
    let score = cap*dur*flv*txt
    scores.push([combo,score])
}
scores.sort((a,b)=>b[1]-a[1])
console.log(scores.shift())