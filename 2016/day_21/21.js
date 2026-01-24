import puz from '../../input.js'
let insts = parseInsts(puz.split('\n'))
let revInsts = insts.toReversed()

let str = 'abcdefgh'
let unstr = 'fbgdceah'
console.log(`Part A: ${scramble(str, insts)}`)
console.log(`Part B: ${unScramble(unstr, revInsts)}`)

function scramble(str,insts){
    for(let inst of insts){
        if(inst.type == 'swppos'){str = swpPos(str, inst.src,inst.trgt)}
        if(inst.type == 'swplet'){str = swpLet(str, inst.src,inst.trgt)}
        if(inst.type == 'rotdir'){str = rotDir(str, inst.dir,inst.amp)}
        if(inst.type == 'rotlet'){str = rotLet(str, str.indexOf(inst.src))}
        if(inst.type == 'rev'){str = rev(str, inst.strt, inst.end)}
        if(inst.type == 'mov'){str = mov(str, inst.src, inst.trgt)}
    }
    return str
}

function unScramble(str,insts){
    for(let inst of insts){
        if(inst.type == 'swppos'){str = swpPos(str, inst.trgt,inst.src)}
        if(inst.type == 'swplet'){str = swpLet(str, inst.trgt,inst.src)}
        if(inst.type == 'rotdir'){str = unRotDir(str, inst.dir,inst.amp)}
        if(inst.type == 'rotlet'){str = unRotLet(str, str.indexOf(inst.src))}
        if(inst.type == 'rev'){str = rev(str, inst.strt, inst.end)}
        if(inst.type == 'mov'){str = mov(str, inst.trgt, inst.src)}
    }
    return str
}

function swpPos(str,src,trgt){
    let arr = str.split('')
    arr[src] = str[trgt]
    arr[trgt] = str[src]
    return arr.join('')
}

function swpLet(str,src,trgt){
    let arr = str.split('')
    let srcind = arr.indexOf(src)
    let trgtind = arr.indexOf(trgt)
    arr[srcind] = trgt
    arr[trgtind] = src
    return arr.join('')
}

function rotDir(str, dir, amp){
    let arr = []
    if(dir == 'right'){ amp = str.length - amp}
    for(let l = amp; l<str.length + amp; l++){
        let x = l%str.length
        arr.push(str[x])
    }
    return arr.join('')
}

function unRotDir(str, dir, amp){
    let arr = []
    if(dir == 'left'){ amp = str.length - amp}
    for(let l = amp; l<str.length + amp; l++){
        let x = l%str.length
        arr.push(str[x])
    }
    return arr.join('')
}

function rotLet(str, ind){
    let rots = ind+1
    if (ind > 3){rots++}
    while(rots >0){
        let arr = []
        for(let i = str.length-1; i < 2*(str.length)-1;i++){
            let x = (i)%str.length
            arr.push(str[x])
        }
        str = arr.join('')
        rots--
    }
    return str
}

function unRotLet(str, ind){
    let rots = 0
    if (ind == 0){rots = str.length+1}
    else if(ind%2 === 0){rots = (ind + str.length)/2 + 1}
    else{rots = (ind + 1)/2}
    while(rots >0){
        let arr = []
        for(let l = 1; l<str.length + 1; l++){
            let x = l%str.length
            arr.push(str[x])
        }
        str = arr.join('')
        rots--
    }
    return str
}

function rev(str, strt, end){
    let arr = str.slice(strt,end+1).split('').reverse()
    let nstr = ''
    if(strt != 0){nstr += str.substring(0,strt)}
    nstr += arr.join('')
    if(end != str.length-1){nstr += str.substring(end+1)}
    return nstr
}

function mov(str, src, trgt){
    let arr = str.split('')
    let ltr = arr.splice(src,1)[0]
    arr.splice(trgt,0,ltr)
    return arr.join('')
}

function parseInsts(arr){
    let objArr = []
    for(let line of arr){
        if(line.search(/swap position/) != -1){
            let x = line.match(/swap position (?<src>\d+) with position (?<trgt>\d+)/).groups
            objArr.push({type:'swppos', src:+x.src, trgt:+x.trgt})
        }
        if(line.search(/swap letter/) != -1){
            let x = line.match(/swap letter (?<src>\w) with letter (?<trgt>\w)/).groups
            objArr.push({type:'swplet', src:x.src, trgt:x.trgt})
        }
        if(line.search(/rotate (left|right)/) != -1){
            let x = line.match(/rotate (?<dir>left|right) (?<amp>\d+)/).groups
            objArr.push({type:'rotdir', dir:x.dir, amp:+x.amp})
        }
        if(line.search(/rotate based/) != -1){
            let x = line.match(/rotate based on position of letter (?<src>\w)/).groups
            objArr.push({type:'rotlet', src:x.src})
        }
        if(line.search(/reverse/) != -1){
            let x = line.match(/reverse positions (?<strt>\d+) through (?<end>\d+)/).groups
            objArr.push({type:'rev', strt:+x.strt, end:+x.end})
        }
        if(line.search(/move/) != -1){
            let x = line.match(/move position (?<src>\d+) to position (?<trgt>\d+)/).groups
            objArr.push({type:'mov', src:+x.src, trgt:+x.trgt})
        }
    }
    return objArr
}