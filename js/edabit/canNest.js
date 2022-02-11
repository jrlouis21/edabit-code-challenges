/*
Check if one array can be nested in another
Instructions:

    Create a function that returns true if the first array can be nested inside the second.
    arr1 can be nested inside arr2 if:

        - arr1's min is greater than arr2's min.
        - arr1's max is less than arr2's max.
*/


function canNest(arr1, arr2){
    return (Math.min.apply(Math, arr1) > Math.min.apply(Math, arr2) && Math.max.apply(Math, arr1) < Math.max.apply(Math, arr2)) ? true : false
}

console.log(canNest([2, 3, 4], [1, 3, 5]))