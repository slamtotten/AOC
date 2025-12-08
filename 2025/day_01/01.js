import puz from "../../input.js";
var sequence = puz.split("\n")       

let dialPosition = 50;
let zeroCount = 0;
        
for(var movement of sequence){
        
    let dir = movement.substring(0,1)
    let turn = +movement.substring(1)

    if (dir == "R") {
        dialPosition += turn;
        
        if (dialPosition >= 100) {
            let fullspin = Math.floor(dialPosition/100)
            zeroCount += fullspin
            dialPosition = dialPosition%100
        }
    } else if (dir == "L") {

        dialPosition -= turn;

        if (dialPosition < 0) {
            let fullspin = 1 + Math.floor(Math.abs(dialPosition/100))
            zeroCount += fullspin
            
            if (dialPosition + turn == 0){          //correction for left movement from 0
                zeroCount--
            }
            
            dialPosition = 100 - Math.abs(dialPosition % 100)
            if (dialPosition == 100){
                dialPosition = 0
            }
            
        } else if (dialPosition == 0){
            zeroCount++
        }
    }
}
console.log(zeroCount)