import {
   isWeakPassword,
   isStrongPassword,
   getUsersWithWeakPasswords,
   getPasswordStrengthCounts,
   resetWeakPasswords,
    sortUsersByAge,
    countNationalities,
    filterUsersByDomain,
    mostCommonDomain,
    getGermanLocations,
    getUsersWithNonNumericPostcode,
    getUsersWithMismatchedNameAndEmail,
    getUsersWithInvalidID
} from '../utils/users_functions';

//console.log("Imprimo el primer usuario")
//console.log(users[0])

console.log("+++++++++++++++++++++++++++++++++++++++")

console.log("Weak Password")

console.log(" Test 1 : \"hola\""+ "\t"+isWeakPassword("hola"))
console.log(" Test 2 : \"holajuan\""+ "\t"+isWeakPassword("holajuan"))
console.log(" Test 3 : \"holaJua\""+ "\t"+isWeakPassword("holaJua"))
console.log(" Test 4 : \"holajua\""+ "\t"+isWeakPassword("holajua"))

console.log("+++++++++++++++++++++++++++++++++++++++")

console.log("Strong Password")

console.log(" Test 1 : \"treintacaracteresminimoparaserfuerte\""+ "\t"+isStrongPassword("treintacaracteresminimoparaserfuerte"))
console.log(" Test 2 : \"notengotreinta\""+ "\t"+isStrongPassword("notengotreinta"))
console.log(" Test 3 : \"TODOMAYUSCULASS\""+ "\t"+isStrongPassword("TODOMAYUSCULASS"))
console.log(" Test 4 : \"MENOSDEQUINCE\""+ "\t"+isStrongPassword("MENOSDEQUINCE"))
console.log(" Test 5 : \"@#%5especial\""+ "\t"+isStrongPassword("@#%5especial"))
console.log(" Test 6 : \"@dosespecial\""+ "\t"+isStrongPassword("@dosespecial"))

console.log("+++++++++++++++++++++++++++++++++++++++")

console.log("Get Users With Weak Passwords")

console.log(" Test 1 : "+ "\t"+getUsersWithWeakPasswords())

console.log("+++++++++++++++++++++++++++++++++++++++")

console.log("Get Password Strength Counts")

console.log(" Test 1 : ")
console.log(("\tWeak "+ "\t"+getPasswordStrengthCounts().weak))
console.log(("\tMedium "+ "\t"+getPasswordStrengthCounts().medium))
console.log(("\tStrong "+ "\t"+getPasswordStrengthCounts().strong))

/*
console.log("+++++++++++++++++++++++++++++++++++++++")

console.log("Reset Weak Passwords")

console.log(" Test 1 : "+resetWeakPasswords())
*/

console.log("+++++++++++++++++++++++++++++++++++++++")

console.log("Sort Users By Age")

const users = sortUsersByAge();


for ( let i =0 ; i<users.length ; i++){
  console.log(" User"+    i+" : "+users[i].name.first)
  console.log("        : "+ users[i].birthdate.age)
}


console.log("+++++++++++++++++++++++++++++++++++++++")

console.log("Count Nationalities")

console.log(countNationalities())


console.log("+++++++++++++++++++++++++++++++++++++++")

console.log("filterUserssByDomain")

const example = filterUsersByDomain("example.com")
const gmail = filterUsersByDomain("gmail.com")

console.log(" Test 1 : ")
for ( let i =0 ; i<example.length ; i++){
  console.log(" User"+    i+" : "+example[i].name.first)
  console.log("        : "+ example[i].email)
}

console.log(" Test 2 : ")
for ( let i =0 ; i<gmail.length ; i++){
  console.log(" User"+    i+" : "+gmail[i].name.first)
  console.log("        : "+ gmail[i].email)
}

console.log("+++++++++++++++++++++++++++++++++++++++")

console.log("Most Common Domain")

console.log(mostCommonDomain())

console.log("+++++++++++++++++++++++++++++++++++++++")

console.log("Get German Locations")

console.log(getGermanLocations())

console.log("+++++++++++++++++++++++++++++++++++++++")

console.log("Get Users With Non Numeric Postcode")

console.log(getUsersWithNonNumericPostcode())

const postCode = getUsersWithNonNumericPostcode()

for (let i of postCode ){
  console.log(i.name.first +" : "+i.location.postcode)
}

console.log("+++++++++++++++++++++++++++++++++++++++")

console.log("Get Users With Mismatched Name And Email")

console.log(getUsersWithMismatchedNameAndEmail())

console.log("+++++++++++++++++++++++++++++++++++++++")

console.log("Get Users With Invalid ID")

const id = getUsersWithInvalidID()

for (let i of id){
  console.log(i.name.first + " : "+ i.id.value)

}

