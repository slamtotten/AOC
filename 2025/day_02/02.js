import puz from '../../input.js'

const ranges = puz.split(",")

let totalInvalid = []
ranges.forEach(splitrange)
console.log(totalInvalid.reduce((a,b) => a+b))

function splitrange(item) {
    let start = +item.split("-")[0]
    let end = +item.split("-")[1]
    for (let num = start; num <= end; num++){
        let id = num.toString();
        if (id.length%2 == 0){
            let split = id.length/2;
            let str1 = id.substring(0,split);
            let str2 = id.substring(split);
            if (str1 == str2){totalInvalid.push(num); continue}
        } 
        if (id.length%3 == 0){
            let split = id.length/3;
            let str1 = id.substring(0,split);
            let str2 = id.substring(split,(split*2))
            let str3 = id.substring((split*2))
            if (str1 == str2 && str2 == str3){totalInvalid.push(num)}
        }
        if (id.length%5 == 0){
            let split = id.length/5;
            let str1 = id.substring(0,split);
            let str2 = id.substring(split,(split*2));
            let str3 = id.substring((split*2),(split*3));
            let str4 = id.substring((split*3),(split*4));
            let str5 = id.substring((split*4))
            if (str1 == str2 && str2 == str3 && str3 == str4 && str4 == str5){totalInvalid.push(num)}
        }
        if (id.length%7 == 0){
            if (id[0] == id[1] && id[1] == id[2] && id[2] == id[3] && id[3] == id[4] && id[4] == id[5] && id[5] == id[6]){totalInvalid.push(num)}
        }
    }
}