class Effect{
    constructor(mana, dur, dmg, arm, mreg){
        this.cost = mana
        this.dur = dur
        this.dmg = dmg
        this.arm = arm
        this.mreg = mreg
    }
}
class Attack{
    constructor(mana, dmg, heal){
        this.cost = mana
        this.dmg = dmg
        this.heal = heal
    }
}

class Queue {
    constructor() {
        this.items = {};
        this.head = 0;
        this.tail = 0;
    }
    
    nq(item) {
        this.items[this.tail] = item;
        this.tail++;
    }
    
    dq() {
        if (this.isEmpty()) return undefined;
        const item = this.items[this.head];
        delete this.items[this.head];
        this.head++;
        return item;
    }
    
    isEmpty() {
        return this.tail - this.head === 0;
    }
}

let wiz = {hp:50, mana:500}
let boss = {hp:58, dmg:9}
let spells = {}
spells['Magic Missle'] = new Attack(53, 4, 0)
spells['Drain'] = new Attack(73,2,2)
spells['Shield'] = new Effect(113, 6, 0, 7, 0)
spells['Poison'] = new Effect(173, 6, 3, 0, 0)
spells['Recharge'] = new Effect(229, 5, 0, 0, 101)

fight()

function fight(){
    let q = new Queue()
    Object.keys(spells).forEach(r=> q.nq([r]))
    while(!q.isEmpty()){
        let seq = q.dq()
        let [whp, wm, bhp, arm, effects, manaSpent] = [wiz.hp, wiz.mana, boss.hp, 0, {}, 0]
        for(let spell of seq){
            //wiz turn
            //Part B
            whp--
            if (whp<=0){break}

            [bhp,arm,wm] = processEffects(effects, bhp, wm)
            if (bhp <= 0){break}
            [whp,wm,bhp,manaSpent] = castSpell(whp,wm,bhp,manaSpent,effects,spell)
            if (bhp <= 0){break}
            //boss turn
            [bhp,arm,wm] = processEffects(effects, bhp, wm)
            if (bhp <= 0){break}
            whp -= Math.max(boss.dmg - arm,1)
            if (whp <= 0){break}       
        }
        if(bhp<=0){console.log(`Win! Mana spent: ${manaSpent}, Spells used: ${seq.join(', ')}`);break}
        else if(whp>0 || wm >= 53){
            let nextspells = Object.keys(spells).filter(r => spells[r].cost < wm && (Object.keys(effects).includes(r)==false || effects[r].dur == 1))
            nextspells.forEach(r => q.nq(seq.concat([r])))
        }
    }
}
    
function processEffects(effects, bhp, wm){
    let arm = 0
    for (let effect of Object.entries(effects)){
        bhp -= effect[1].dmg
        arm += effect[1].arm
        wm += effect[1].mreg
        effect[1].dur--
        if(effect[1].dur == 0){ delete effects[effect[0]]}
    }
    return [bhp,arm,wm]
}

function castSpell(whp,wm,bhp,manaSpent, effects, spell){
    manaSpent += spells[spell].cost
    wm -= spells[spell].cost
    if (spells[spell].constructor.name == "Effect"){
        effects[spell] = {dur: spells[spell].dur, dmg: spells[spell].dmg, arm: spells[spell].arm, mreg: spells[spell].mreg}
        return [whp,wm,bhp,manaSpent]
    }
    else{
        bhp -= spells[spell].dmg
        whp = Math.min((whp + spells[spell].heal), wiz.hp)
        return [whp,wm,bhp,manaSpent]
    }
}