import {readFileSync} from 'fs'
let bs = readFileSync('boss.txt','utf-8').match(/Hit Points: (?<hp>\d+)\s+Damage: (?<dmg>\d+)\s+Armor: (?<arm>\d+)/).groups
let store = readFileSync('store.txt','utf-8').split('\n\n')
let storeW = store[0].split('\n')
let storeA = store[1].split('\n')
let storeR = store[2].split('\n')

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
        this.basehp = hp
    }

    equip(item){
        this.dmg += item.dmg
        this.arm += item.arm
    }
    dequip(item){
        this.dmg -= item.dmg
        this.arm -= item.arm
    }
}

let boss = new Char(+bs.hp, +bs.dmg, +bs.arm)
let hero = new Char(100,0,0)

let [weapons,armor,rings] = [[],[],[]]
for (let line of storeW){
    let x = line.match(/(?<name>\w+(?: \+\d+)?)\s+(?<cost>\d+)\s+(?<dmg>\d+)\s+(?<arm>\d+)/)
    if (x == null){continue}
    let wep = new Item(x.groups.name, +x.groups.cost, +x.groups.dmg, +x.groups.arm)
    weapons.push(wep)
}

for (let line of storeA){
    let x = line.match(/(?<name>\w+(?: \+\d+)?)\s+(?<cost>\d+)\s+(?<dmg>\d+)\s+(?<arm>\d+)/)
    if (x == null){continue}
    let arm = new Item(x.groups.name, +x.groups.cost, +x.groups.dmg, +x.groups.arm)
    armor.push(arm)
}

for (let line of storeR){
    let x = line.match(/(?<name>\w+(?: \+\d+)?)\s+(?<cost>\d+)\s+(?<dmg>\d+)\s+(?<arm>\d+)/)
    if (x == null){continue}
    let ring = new Item(x.groups.name, +x.groups.cost, +x.groups.dmg, +x.groups.arm)
    rings.push(ring)
}

let [arsenal,wins,losses] = [[],[],[]]
for(let w = 0; w < weapons.length; w++){
    arsenal.push(weapons[w])
    for(let a = 0; a <= armor.length ; a++){
        if(a != armor.length){arsenal.push(armor[a])}
        for(let r1 = 0; r1 <= rings.length; r1++){
            if(r1 != rings.length){arsenal.push(rings[r1])}
            for(let r2 = 0; r2 <= rings.length; r2++){
                if(r1 == r2){continue}
                if(r2 != rings.length){arsenal.push(rings[r2])}
                for(let item of arsenal){
                    hero.equip(item)
                }
                let cost = 0
                let gear = []
                arsenal.forEach(r => {cost+= r.cost; gear.push(r.name)})
                if(fight(hero, boss)=="win"){wins.push({gear:gear,cost:cost})}
                else{losses.push({gear:gear,cost:cost})}
                for(let item of arsenal){
                    hero.dequip(item)
                }
                hero.hp = hero.basehp
                boss.hp = boss.basehp
                if(r2 != rings.length){arsenal.pop()}
            }
            if(r1 != rings.length){arsenal.pop()}
        }
        if(a != armor.length){arsenal.pop()}
    }
    arsenal.pop()
}

let cw = wins.sort((a,b)=> a.cost-b.cost).shift()
let el = losses.sort((a,b)=> b.cost-a.cost).shift()
console.log(`Cheapest win: $${cw.cost} using ${cw.gear}`)
console.log(`Most expensive loss: $${el.cost} using ${el.gear}`)

function fight(h,b){
    let bdmg = b.dmg - h.arm
    let hdmg = h.dmg - b.arm
    if (bdmg<=0){bdmg = 1}
    if (hdmg<=0){hdmg = 1}
    do{
        b.hp -= hdmg
        if(b.hp>0){h.hp -= bdmg}
    }while(h.hp >0 && b.hp>0)
    let result = ""
    if(h.hp>0){result = "win"}
    else{result = "lose"}
    console.log(result)
    return result
}