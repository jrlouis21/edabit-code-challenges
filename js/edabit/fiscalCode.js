/*
Each person in Italy has an unique identifying ID code issued by the national tax office after the birth registration: the Fiscal Code (Codice Fiscale). Check the Resources tab for more info on this.

Given an object containing the personal data of a person (name, surname, gender and date of birth) return the 11 code characters as a string following these steps:

Generate 3 capital letters from the surname, if it has:

    - At least 3 consonants then the first three consonants are used. (Newman -> NWM).
    - Less than 3 consonants then vowels will replace missing characters in the same order they appear (Fox -> FXO | Hope -> HPO).
    - Less than three letters then "X" will take the third slot after the consonant and the vowel (Yu -> YUX).

Generate 3 capital letters from the name, if it has:

    - Exactly 3 consonants then consonants are used in the order they appear (Matt -> MTT).
    - More than 3 consonants then first, third and fourth consonant are used (Samantha -> SNT | Thomas -> TMS).
    - Less than 3 consonants then vowels will replace missing characters in the same order they appear (Bob -> BBO | Paula -> PLA).
    - Less than three letters then "X" will take the the third slot after the consonant and the vowel (Al -> LAX).
    
Generate 2 numbers, 1 letter and 2 numbers from date of birth and gender:

    - Take the last two digits of the year of birth (1985 -> 85).
    - Generate a letter corresponding to the month of birth (January -> A | December -> T) using the table for conversion included in the code.
    - For males take the day of birth adding one zero at the start if is less than 10 (any 9th day -> 09 | any 20th day -> 20).
    - For females take the day of birth and sum 40 to it (any 9th day -> 49 | any 20th day -> 60).

Examples:

    fiscalCode({
    name: "Matt",
    surname: "Edabit",
    gender: "M",
    dob: "1/1/1900"
    }) ➞ "DBTMTT00A01"

    fiscalCode({
    name: "Helen",
    surname: "Yu",
    gender: "F",
    dob: "1/12/1950"
    }) ➞ "YUXHLN50T41"

    fiscalCode({
    name: "Mickey",
    surname: "Mouse",
    gender: "M",
    dob: "16/1/1928"
    }) ➞ "MSOMKY28A16"

Notes:

    - Code letters must be uppercase.
    - Date of birth is given in D/M/YYYY format.
    - The conversion table for months is already in the starting code.
    - Y is not a vowel.
*/

const months = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H",
7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T" }

function fiscalCode(person) {
    this.splitName = function(n){
        consonants = []
        vowels = []

        for (letter in n.split("")){
            letter = n.split("")[letter].toUpperCase()
            if (letter.match(/[AEIOU]/g)){
                vowels.push(letter)
            } else {
                consonants.push(letter)
            }
        }

        return [consonants, vowels]
    }

    let { name, surname, gender, dob } = person

    // Generate 3 letter code from the surname
    surnameCode = (() => { 
        surnameSplit = splitName(surname)
        surname = [...surnameSplit[0], ...surnameSplit[1]] // Example: ["M", "S", "O", "U", "E"]

        // Now that everything is in order, generate a three digit code. If length of array is less than three then replace with X
        if (surname.length < 3){
            filler = 3 - surname.length
            code = surname.join("") + "X".repeat(filler)
        } else {
            code = surname.slice(0,3).join("")
        }

        return code
    })() // Example: "MSO"


    // Generate a 3 letter code for the name
    nameCode = (() => {
        nameSplit = splitName(name)

        if (nameSplit[0].length > 3){ // More than three consonants
            code = nameSplit[0][0] + nameSplit[0][2] + nameSplit[0][3] 
        } else if (nameSplit[0].length == 3){ // Exactly three consonants
            code = nameSplit[0].join("")
        } else { // Less than three consonants
            nameSplit = [...nameSplit[0], ...nameSplit[1]]
            if (nameSplit.length < 3) { // Less than three letters (Add filler X)
                code = nameSplit.join("") + "X".repeat(3 - nameSplit.length)
            } else {
                code = nameSplit.slice(0,3).join("")
            }
        }

        return code
    })() // Example: "MKY"

    
    // Generate Two Numbers and a Digit to correspond with the dob
    dobCode = (() => {
        dateSplit = dob.split("/")
        date = new Date(`${dateSplit[1]}/${dateSplit[0]}/${dateSplit[2]}`)
        day = date.getDate()
        if (gender == "M" && day < 10){ // M with a birthday on 1-9
                day = "0" + day.toString()
        } else if (gender == "M") { // M with a birthday 10-31
            day = day.toString()
        } else { // Female
            day = (day + 40).toString()
        }


        return `${date.getFullYear().toString().slice(-2)}${months[date.getMonth() + 1]}${day}`
    })() // Example: "28A16"

    

    // Combine all of the codes into one
    return `${surnameCode}${nameCode}${dobCode}`

}

// Test Cases: 
console.log(fiscalCode({ name: "Brendan", surname: "Eich", gender: "M", dob: "1/12/1961" })) // "CHEBND61T01"
console.log(fiscalCode({ name: "Helen", surname: "Yu", gender: "F", dob: "1/12/1950" })) // "YUXHLN50T41"
console.log(fiscalCode({ name: "Al", surname: "Capone", gender: "M", dob: "17/1/1899" })) // "CPNLAX99A17"
console.log(fiscalCode({ name: "Mickey", surname: "Mouse", gender: "M", dob: "16/1/1928" })) // "MSOMKY28A16"
console.log(fiscalCode({ name: "Marie", surname: "Curie", gender: "F", dob: "7/11/1867" })) // "CRUMRA67S47"