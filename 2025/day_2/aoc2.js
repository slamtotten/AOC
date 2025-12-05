console.time('time')
import { readFileSync } from 'node:fs';
import { arrayBuffer } from 'node:stream/consumers';

//var input = readFileSync("./test.txt", "utf8");
var input = readFileSync("./input.txt", "utf8");
var ranges = input.split(",")
console.log(ranges)

let totalInvalid = 0;

ranges.forEach(splitrange)



function splitrange(item) {
    let start = item.split("-")[0];
    let end = item.split("-")[1];

    start = Number(start)
    end = Number(end)
    console.log(start,end)

    for (let num = start; num <= end; num++){
        
        let id = num.toString();
 
        if (id.length%2 == 0){
            let split = id.length/2;
            let str1 = id.substring(0,split);
            let str2 = id.substring(split);
            if (str1 == str2){
                console.log(id)
                totalInvalid += Number(id)
                continue
            }
        } 
        if (id.length%3 == 0){
            let split = id.length/3;
            let str1 = id.substring(0,split);
            let str2 = id.substring(split,(split*2))
            let str3 = id.substring((split*2))
            if (str1 == str2 && str2 == str3){
                console.log(id)
                totalInvalid += Number(id)
                
            }
        }
        if (id.length%5 == 0){
            let split = id.length/5;
            let str1 = id.substring(0,split);
            let str2 = id.substring(split,(split*2));
            let str3 = id.substring((split*2),(split*3));
            let str4 = id.substring((split*3),(split*4));
            let str5 = id.substring((split*4))
            if (str1 == str2 && str2 == str3 && str3 == str4 && str4 == str5){
                console.log(id)
                totalInvalid += Number(id)
                
            }
        }
        if (id.length%7 == 0){
            if (id[0] == id[1] && id[1] == id[2] && id[2] == id[3] && id[3] == id[4] && id[4] == id[5] && id[5] == id[6]){
                console.log(id)
                totalInvalid += Number(id)
                
            }
        }
    }
}

console.log(totalInvalid)
console.timeEnd('time')