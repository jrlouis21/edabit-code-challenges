/*
This challenge will help you interpret mathematical relationships both algebraically and geometrically.

Matchstick Houses, Steps 1, 2 and 3

Create a function that takes a number (step) as an argument and returns the number of matchsticks in that step. See step 1, 2 and 3 in the image above.

Examples
matchHouses(1) ➞ 6

matchHouses(4) ➞ 21

matchHouses(87) ➞ 436
Notes
Step 0 returns 0 matchsticks.
The input (step) will always be a non-negative integer.
Think of the input (step) as the total number of houses that have been connected together.
*/


function matchHouses(step) {
    if (!step || step < 0) return 0 // Make sure that step is not a negative number or equal to 0. If it is, then return 0
    return (step - 1) * 5 + 6
}

// Test Cases:
console.log(matchHouses(-4)) // 0
console.log(matchHouses(1)) // 6
console.log(matchHouses(10)) // 51
