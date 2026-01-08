import puz from "../../input.js"
var boxes = puz.split("\r\n").map(r => r.split("x"))

let sqft = 0
let ribbon = 0

const area = (w,l,h) => {return 2*(w*l+l*h+h*w)}
const extra = (w,l) => {return w*l}
const circ = (w,l) => {return 2*((+w)+(+l))}
const volu = (w,l,h) => {return w*l*h}

//Part A
for (let box of boxes){
    box.sort((a,b) => a-b)
    sqft += area(box[0],box[1],box[2])
    sqft += extra(box[0],box[1])
}
console.log('Total wrapping paper:',sqft,'sqft')
//Part B
for (let box of boxes){
    box.sort((a,b) => a-b)
    ribbon += circ(box[0],box[1])
    ribbon += volu(box[0],box[1],box[2])
}
console.log('Total ribbon:',ribbon,'feet')

