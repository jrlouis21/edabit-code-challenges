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

const 
    months = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H", 7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T" },
    vowels = ['A', 'E', 'I', 'O', 'U']

function getVowels(str){
    return str.toUpperCase().split('').filter(letter => vowels.includes(letter))
}

function getConsonants(str){
    return str.toUpperCase().split('').filter(letter => !vowels.includes(letter))
}

function cleanNameCode(code){
    return code + 'X'.repeat(3 - code.length)
}

function parseSurname(surname){
    // - At least 3 consonants then the first three consonants are used. (Newman -> NWM).
    // - Less than 3 consonants then vowels will replace missing characters in the same order they appear (Fox -> FXO | Hope -> HPO).
    let 
        consonants = getConsonants(surname).slice(0, 3),
        vowels = (consonants.length < 3) ? getVowels(surname) : [],
        result = [...consonants, ...vowels].slice(0, 3).join('')

    // - Less than three letters then "X" will take the third slot after the consonant and the vowel (Yu -> YUX).
    return cleanNameCode(result)
}

function parseName(name){
    let 
        consonants = getConsonants(name),
        result = (() => {
            // - Exactly 3 consonants then consonants are used in the order they appear (Matt -> MTT).
            if (consonants.length == 3) return consonants

            // - More than 3 consonants then first, third and fourth consonant are used (Samantha -> SNT | Thomas -> TMS).
            if (consonants.length > 3) {
                return [consonants[0], ...consonants.slice(2, 4)]
            } 
            // - Less than 3 consonants then vowels will replace missing characters in the same order they appear (Bob -> BBO | Paula -> PLA).
            else {
                return [...consonants, ...getVowels(name)].slice(0, 3)
            }
        })().join('')

    // - Less than three letters then "X" will take the the third slot after the consonant and the vowel (Al -> LAX).
    return cleanNameCode(result)
}

function parseDob(dob, gender){
    let 
        parsedDob = dob.split('/')
        
        // - Take the last two digits of the year of birth (1985 -> 85).
        yearSimplified = dob.slice(-2),
        // - Generate a letter corresponding to the month of birth (January -> A | December -> T) using the table for conversion included in the code.
        dobMonthCode = months[parsedDob[1]],

        genderCode = (() => {
            let dayOfBirth = parsedDob[0]
            // - For males take the day of birth adding one zero at the start if is less than 10 (any 9th day -> 09 | any 20th day -> 20).
            if (gender == 'M'){
                return (dayOfBirth.length == 1) ? '0' + dayOfBirth : dayOfBirth
            }
            // - For females take the day of birth and sum 40 to it (any 9th day -> 49 | any 20th day -> 60).
            else {
                return (parseInt(dayOfBirth) + 40).toString()
            }
        })()

    return yearSimplified + dobMonthCode + genderCode
}


function fiscalCode(person) {
    return parseSurname(person.surname) + parseName(person.name) + parseDob(person.dob, person.gender)
}

// Test Cases: 
console.log(fiscalCode({ name: "Brendan", surname: "Eich", gender: "M", dob: "1/12/1961" })) // "CHEBND61T01"
console.log(fiscalCode({ name: "Helen", surname: "Yu", gender: "F", dob: "1/12/1950" })) // "YUXHLN50T41"
console.log(fiscalCode({ name: "Al", surname: "Capone", gender: "M", dob: "17/1/1899" })) // "CPNLAX99A17"
console.log(fiscalCode({ name: "Mickey", surname: "Mouse", gender: "M", dob: "16/1/1928" })) // "MSOMKY28A16"
console.log(fiscalCode({ name: "Marie", surname: "Curie", gender: "F", dob: "7/11/1867" })) // "CRUMRA67S47"