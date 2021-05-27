/* Find The Number!
Prompt: Create a function that takes an array of numbers and return "Boom!" if the digit 7 appears in the array. Otherwise, return "there is no 7 in the array".
*/


// Attempt # 1
// Turns each integer into a string to compare the two values
function sevenBoom(a) {
    containsValue = false
    a = (!Array.isArray(a)) ? [a] : a // Convert the first variable to a string if it's not already
    a.forEach(i => {
        if (i.toString().includes("7")){ // Compare both strings and see if the value is contained in the int
            containsValue = true
        }
    })
    return (containsValue) ? "Boom!" : `there is no 7 in the array`
}


// Test Cases
console.log(sevenBoom([1, 2, 3, 4, 1234], 9)) // there is no 9 in the array
console.log(sevenBoom([1, 2, 3, 4], 5)) // there is no 5 in the array
console.log(sevenBoom([1, 234, 567, 890], 5)) // Boom!
console.log(sevenBoom(1, 4)) // there is no 4 in the array
console.log(sevenBoom(7, 7)) // Boom!