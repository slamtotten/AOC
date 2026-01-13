import puz from '../../input.js'
let store = puz.split('\n\n')
let storeW = store[0].split('\n').slice(1)
let storeA = store[1].split('\n').slice(1)
let storeR = store[2].split('\n').slice(1)

class Item{
    constructor(name, cost, dmg, arm){
        this.name = name
        this.cost = cost
        this.dmg = dmg
        this.arm = arm     
    }
}

class Char{
    constructor(hp, dmg, arm){
        this.hp = hp
        this.dmg = dmg
        this.arm = arm
        this.maxhp = hp
        this.gear = {}
    }

    equip(item){
        this.gear[item.name] = item
        this.dmg += item.dmg
        this.arm += item.arm
    }
    dequip(item){
        if(this.gear[item.name]==undefined){return undefined}
        delete this.gear[item.name]
        this.dmg -= item.dmg
        this.arm -= item.arm
    }
}

let boss = new Char(104, 8, 1)
let hero = new Char(100,0,0)

let [weapons,armor,rings] = [[],[],[]]
for (let line of storeW){
    let x = line.match(/(?<name>\w+)\s+(?<cost>\d+)\s+(?<dmg>\d+)\s+(?<arm>\d+)/).groups
    let wep = new Item(x.name, +x.cost, +x.dmg, +x.arm)
    weapons.push(wep)
}

for (let line of storeA){
    let x = line.match(/(?<name>\w+)\s+(?<cost>\d+)\s+(?<dmg>\d+)\s+(?<arm>\d+)/).groups
    let arm = new Item(x.name, +x.cost, +x.dmg, +x.arm)
    armor.push(arm)
}

for (let line of storeR){
    let x = line.match(/(?<name>\w+ \+\d+)\s+(?<cost>\d+)\s+(?<dmg>\d+)\s+(?<arm>\d+)/).groups
    let ring = new Item(x.name, +x.cost, +x.dmg, +x.arm)
    rings.push(ring)
}

let [wins,losses] = [[],[]]
equipCycle()

let cw = wins.sort((a,b)=> a.cost-b.cost).shift()
let el = losses.sort((a,b)=> b.cost-a.cost).shift()

console.log(`Cheapest win: ${cw.cost}g using ${cw.gear.join(', ')}`)
console.log(`Most expensive loss: ${el.cost}g using ${el.gear.join(', ')}`)

function equipCycle(){
    for(let w = 0; w < weapons.length; w++){
        hero.equip(weapons[w])
        arm()
        hero.dequip(weapons[w])
    }
}
function arm(){
    for(let a = 0; a <= armor.length ; a++){
        if(a != armor.length){hero.equip(armor[a])}
        ring1()
        if(a != armor.length){hero.dequip(armor[a])}
    }
}

function ring1(){
    for(let r1 = 0; r1 <= rings.length; r1++){
        if(r1 != rings.length){hero.equip(rings[r1])}
        ring2(r1)
        if(r1 != rings.length){hero.dequip(rings[r1])}
    }
}

function ring2(r1){
    for(let r2 = 0; r2 <= rings.length; r2++){
        if(r2 != r1){
            if(r2 != rings.length){hero.equip(rings[r2])}
            collectStats()
            if(r2 != rings.length){hero.dequip(rings[r2])}
        }
    }
}

function collectStats(){
    let cost = findCost(hero.gear)
    if(fight(hero, boss)=="win"){wins.push({gear:Object.keys(hero.gear),cost:cost})}
    else{losses.push({gear:Object.keys(hero.gear),cost:cost})}
}

function fight(h,b){
    let bdmg = b.dmg - h.arm
    let hdmg = h.dmg - b.arm
    if (bdmg <= 0){bdmg = 1}
    if (hdmg <= 0){hdmg = 1}
    do{
        b.hp -= hdmg
        if(b.hp>0){h.hp -= bdmg}
    }while(h.hp >0 && b.hp>0)
    if(h.hp>0){
        hero.hp = hero.maxhp
        boss.hp = boss.maxhp
        return "win"}
    else{
        hero.hp = hero.maxhp
        boss.hp = boss.maxhp
        return "lose"}
}

function findCost(gear){
    let cost = 0
    Object.values(gear).forEach(r=> cost+=r.cost)
    return cost
}