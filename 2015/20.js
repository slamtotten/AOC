let input = 36000000

for(let house = 0; ;house += 10){
    let presentsA = 0
    let presentsB = 0
    let ephA = 0
    let ephB = 0
    for(let elf = 1;elf<=house;elf++){
        if(house%elf == 0){presentsA += elf*10; ephA++}
        if(house>elf*50){continue}
        if(house%elf == 0){presentsB += elf*11; ephB++}
    }
    if (presentsA >= input){
        console.log(`PartA: House #${house}`)         
    }
    if (presentsB >= input){
        console.log(`PartB: House #${house}`)
    }
    if (presentsA>= input && presentsB>= input){break}
}
