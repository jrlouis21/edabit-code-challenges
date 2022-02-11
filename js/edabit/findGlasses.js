/*
Where Are My Glasses?
Oh no! I've lost my glasses, but paradoxically, I need glasses to find my glasses!

Please help me out by showing me the index in the list which contains my glasses. They look like two capital Os, with any number of dashes in between!

This means that both O--O and O------------O are valid glasses, but not O----#--O for example!
Search thoroughly, maybe you'll find my glasses in places such as 'dustO-Odust'
*/

// Attempt #1
function findGlasses(arr) {
    for (i in arr){
        if (arr[i].match(/O-{1,}O/g)){ // Match each item in the array against regex for the specified string
            return parseInt(i) // if the regex matches the array item, return the index where the match occurs in the array
        } else {
            continue;
        }
    }
    //Glasses not found
    return 'Not Found'
}

// Test Cases
console.log(findGlasses(["phone", "O-O", "coins", "keys"])) // 1
console.log(findGlasses(["OO", "wallet", "O##O", "O----O"])) // 3
console.log(findGlasses(["O--#--O", "dustO---Odust", "more dust"])) // 1


// Attempt #2, this time finding each index where the match occurs, if no match then return an empty arr.
function findAllGlasses(arr) {
    response = []
    for (i in arr){
        if (arr[i].match(/O-{1,}O/g)){ // Match each item in the array against regex for the specified string
            response.push(parseInt(i)) // if the regex matches the array item, return the index where the match occurs in the array
        } else {
            continue;
        }
    }
    return response
}

console.log(findAllGlasses(["phone", "O-O", "coins", "keys", "O-----O"])) // [1,4]
console.log(findAllGlasses(["OO", "wallet", "O##O", "O----O", "O--O"])) // [3,4]
console.log(findAllGlasses(["O--#--O", "dustO---Odust", "more dust"])) // [1]