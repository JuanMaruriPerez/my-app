"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_functions_1 = require("../utils/users_functions");
//console.log("Imprimo el primer usuario")
//console.log(users[0])
console.log("+++++++++++++++++++++++++++++++++++++++");
console.log("Weak Password");
console.log(" Test 1 : \"hola\"" + "\t" + (0, users_functions_1.isWeakPassword)("hola"));
console.log(" Test 2 : \"holajuan\"" + "\t" + (0, users_functions_1.isWeakPassword)("holajuan"));
console.log(" Test 3 : \"holaJua\"" + "\t" + (0, users_functions_1.isWeakPassword)("holaJua"));
console.log(" Test 4 : \"holajua\"" + "\t" + (0, users_functions_1.isWeakPassword)("holajua"));
console.log("+++++++++++++++++++++++++++++++++++++++");
console.log("Strong Password");
console.log(" Test 1 : \"treintacaracteresminimoparaserfuerte\"" + "\t" + (0, users_functions_1.isStrongPassword)("treintacaracteresminimoparaserfuerte"));
console.log(" Test 2 : \"notengotreinta\"" + "\t" + (0, users_functions_1.isStrongPassword)("notengotreinta"));
console.log(" Test 3 : \"TODOMAYUSCULASS\"" + "\t" + (0, users_functions_1.isStrongPassword)("TODOMAYUSCULASS"));
console.log(" Test 4 : \"MENOSDEQUINCE\"" + "\t" + (0, users_functions_1.isStrongPassword)("MENOSDEQUINCE"));
console.log(" Test 5 : \"@#%5especial\"" + "\t" + (0, users_functions_1.isStrongPassword)("@#%5especial"));
console.log(" Test 6 : \"@dosespecial\"" + "\t" + (0, users_functions_1.isStrongPassword)("@dosespecial"));
console.log("+++++++++++++++++++++++++++++++++++++++");
console.log("Get Users With Weak Passwords");
console.log(" Test 1 : " + "\t" + (0, users_functions_1.getUsersWithWeakPasswords)());
console.log("+++++++++++++++++++++++++++++++++++++++");
console.log("Get Password Strength Counts");
console.log(" Test 1 : ");
console.log(("\tWeak " + "\t" + (0, users_functions_1.getPasswordStrengthCounts)().weak));
console.log(("\tMedium " + "\t" + (0, users_functions_1.getPasswordStrengthCounts)().medium));
console.log(("\tStrong " + "\t" + (0, users_functions_1.getPasswordStrengthCounts)().strong));
/*
console.log("+++++++++++++++++++++++++++++++++++++++")

console.log("Reset Weak Passwords")

console.log(" Test 1 : "+resetWeakPasswords())
*/
console.log("+++++++++++++++++++++++++++++++++++++++");
console.log("Sort Users By Age");
var users = (0, users_functions_1.sortUsersByAge)();
for (var i = 0; i < users.length; i++) {
    console.log(" User" + i + " : " + users[i].name.first);
    console.log("        : " + users[i].birthdate.age);
}
console.log("+++++++++++++++++++++++++++++++++++++++");
console.log("Count Nationalities");
console.log((0, users_functions_1.countNationalities)());
console.log("+++++++++++++++++++++++++++++++++++++++");
console.log("filterUserssByDomain");
var example = (0, users_functions_1.filterUsersByDomain)("example.com");
var gmail = (0, users_functions_1.filterUsersByDomain)("gmail.com");
console.log(" Test 1 : ");
for (var i = 0; i < example.length; i++) {
    console.log(" User" + i + " : " + example[i].name.first);
    console.log("        : " + example[i].email);
}
console.log(" Test 2 : ");
for (var i = 0; i < gmail.length; i++) {
    console.log(" User" + i + " : " + gmail[i].name.first);
    console.log("        : " + gmail[i].email);
}
console.log("+++++++++++++++++++++++++++++++++++++++");
console.log("Most Common Domain");
console.log((0, users_functions_1.mostCommonDomain)());
console.log("+++++++++++++++++++++++++++++++++++++++");
console.log("Get German Locations");
console.log((0, users_functions_1.getGermanLocations)());
console.log("+++++++++++++++++++++++++++++++++++++++");
console.log("Get Users With Non Numeric Postcode");
console.log((0, users_functions_1.getUsersWithNonNumericPostcode)());
var postCode = (0, users_functions_1.getUsersWithNonNumericPostcode)();
for (var _i = 0, postCode_1 = postCode; _i < postCode_1.length; _i++) {
    var i = postCode_1[_i];
    console.log(i.name.first + " : " + i.location.postcode);
}
console.log("+++++++++++++++++++++++++++++++++++++++");
console.log("Get Users With Mismatched Name And Email");
console.log((0, users_functions_1.getUsersWithMismatchedNameAndEmail)());
console.log("+++++++++++++++++++++++++++++++++++++++");
console.log("Get Users With Invalid ID");
var id = (0, users_functions_1.getUsersWithInvalidID)();
for (var _a = 0, id_1 = id; _a < id_1.length; _a++) {
    var i = id_1[_a];
    console.log(i.name.first + " : " + i.id.value);
}
