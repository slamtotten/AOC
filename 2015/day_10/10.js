import input from "../../input.js"

console.log(recurse(input, 0))

function recurse(start, steps){
    if (steps == 50){return start.length}
    else{
        let ans = ""
        let totdigit = 1
        for(let i = 0; i<start.length;i++){
            if (start[i] == start[i+1]){totdigit++}
            else {
                ans += totdigit
                ans += start[i]
                totdigit = 1
            }
        }
        return recurse(ans, steps+1)
    }
}