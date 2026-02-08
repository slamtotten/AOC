import puz from '../input.js'
let store = puz.split('\n\n')
let wepSheet = store[0].split('\n').slice(1)
let armSheet = store[1].split('\n').slice(1)
let ringSheet = store[2].split('\n').slice(1)

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
stockStore(wepSheet, weapons)
stockStore(armSheet, armor)
stockStore(ringSheet, rings)

let [wins,losses] = [[],[]]

for(let c of eqCombos()){
    eq(c)
    collectStats()
    dq(c)
}

let cw = wins.sort((a,b)=> a.cost-b.cost).shift()
let el = losses.sort((a,b)=> b.cost-a.cost).shift()

console.log(`Cheapest win: ${cw.cost}g using ${cw.gear.join(', ')}`)
console.log(`Most expensive loss: ${el.cost}g using ${el.gear.join(', ')}`)

function stockStore(srcArr, trgtArr){
    for (let line of srcArr){
        let x = line.match(/(?<name>\w+(?: \+\d+)?)\s+(?<cost>\d+)\s+(?<dmg>\d+)\s+(?<arm>\d+)/).groups
        let item = new Item(x.name, +x.cost, +x.dmg, +x.arm)
        trgtArr.push(item)
    }
}

function* eqCombos(){
    for(let w = 0;w<weapons.length;w++){
        for(let a = 0; a<=armor.length;a++){
            for(let r1 = 0; r1<=rings.length;r1++){
                for(let r2 = 0; r2<=rings.length;r2++){
                    if(r2 == r1){continue}
                    yield [w,a,r1,r2]
}}}}}

function eq([w,a,r1,r2]){
    hero.equip(weapons[w])
    if(a != armor.length){hero.equip(armor[a])}
    if(r1 != rings.length){hero.equip(rings[r1])}
    if(r2 != rings.length){hero.equip(rings[r2])}
}

function dq([w,a,r1,r2]){
    hero.dequip(weapons[w])
    if(a != armor.length){hero.dequip(armor[a])}
    if(r1 != rings.length){hero.dequip(rings[r1])}
    if(r2 != rings.length){hero.dequip(rings[r2])}
}

function collectStats(){
    let cost = findCost(hero.gear)
    if(fight(hero, boss)=="win"){wins.push({gear:Object.keys(hero.gear),cost:cost})}
    else{losses.push({gear:Object.keys(hero.gear),cost:cost})}
}

function findCost(gear){
    let cost = 0
    Object.values(gear).forEach(r=> cost+=r.cost)
    return cost
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