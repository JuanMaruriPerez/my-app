"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersWithInvalidID = exports.getUsersWithMismatchedNameAndEmail = exports.getUsersWithNonNumericPostcode = exports.getGermanLocations = exports.mostCommonDomain = exports.filterUsersByDomain = exports.countNationalities = exports.sortUsersByAge = exports.resetWeakPasswords = exports.getPasswordStrengthCounts = exports.getUsersWithWeakPasswords = exports.isStrongPassword = exports.isWeakPassword = void 0;
var users_1 = require("../data/users");
/* Function to determine if a password is weak
* It will be weak if it has all lowercase letters and it less that 8 letters long
*/
var isWeakPassword = function (password) {
    return password.length < 8 && /^[a-z]*$/.test(password);
};
exports.isWeakPassword = isWeakPassword;
/* Function to determine if a password is strong
* It will be strong if:
*     - At leat 30 characters long OR
*     - At least 15 characters long and no lowercase letters OR
*     - More than 10 characters and contains 3 types [lowercase,uppercase,digits,special_characters] hasLowerCase || hasUpperCase || hasDigits || hasSpecialChars
*/
var isStrongPassword = function (password) {
    var hasLowerCase = /[a-z]/.test(password);
    var hasUpperCase = /[A-Z]/.test(password);
    var hasDigits = /\d/.test(password);
    var hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    return (password.length >= 30 ||
        (password.length >= 15 && !hasLowerCase) ||
        (password.length > 10 && ((hasLowerCase && hasUpperCase && hasDigits) ||
            (hasLowerCase && hasUpperCase && hasSpecialChars) ||
            (hasLowerCase && hasSpecialChars && hasDigits) ||
            (hasUpperCase && hasDigits && hasSpecialChars))));
};
exports.isStrongPassword = isStrongPassword;
/* Function to get name of all the users that have a weak password.
* It returns Name[] of all users with weak passwords.
*/
var getUsersWithWeakPasswords = function () {
    return users_1.users
        .filter(function (user) { return isWeakPassword(user.login.password); })
        .map(function (user) { return [user.name.first]; });
};
exports.getUsersWithWeakPasswords = getUsersWithWeakPasswords;
/*const getUsersWithWeakPasswords = (): [ string, string, string][] => {
    return users
      .filter(user => isWeakPassword(user.login.password))
      .map(user => [user.name.title, user.name.first, user.name.last]);
  };
 */
/* Function to count users with weak, strong, and medium difficulty passwords
* It returns an object with 3 integers :
*     - 1. number of weak passwords
*     - 2. number of strong passwords
*     - 3. number of medium passwords
*/
var getPasswordStrengthCounts = function () {
    var counts = { weak: 0, strong: 0, medium: 0 };
    users_1.users.forEach(function (user) {
        if (isWeakPassword(user.login.password)) {
            counts.weak++;
        }
        else if (isStrongPassword(user.login.password)) {
            counts.strong++;
        }
        else {
            counts.medium++;
        }
    });
    return counts;
};
exports.getPasswordStrengthCounts = getPasswordStrengthCounts;
// Function to reset weak passwords
var resetWeakPasswords = function () {
    users_1.users.forEach(function (user) {
        if (isWeakPassword(user.login.password)) {
            user.login.password = "pleaseupdateyourpassword";
        }
    });
};
exports.resetWeakPasswords = resetWeakPasswords;
// Function to sort users by age
var sortUsersByAge = function () {
    return users_1.users.slice().sort(function (a, b) { return a.birthdate.age - b.birthdate.age; });
};
exports.sortUsersByAge = sortUsersByAge;
// Function to count nationalities
var countNationalities = function () {
    var uniqueNationalities = new Set(users_1.users.map(function (user) { return user.nationality; }));
    return uniqueNationalities;
};
exports.countNationalities = countNationalities;
// Function to filter users by email domain
var filterUsersByDomain = function (domain) {
    return users_1.users.filter(function (user) { return user.email.endsWith("@".concat(domain)); });
};
exports.filterUsersByDomain = filterUsersByDomain;
// Function to get most common email domain excluding example.com
var mostCommonDomain = function () {
    var domains = users_1.users.map(function (user) { return user.email.split('@')[1]; });
    var counts = {};
    domains.forEach(function (domain) {
        //if (domain !== 'example.com') {
        counts[domain] = (counts[domain] || 0) + 1;
        //}
    });
    return Object.keys(counts).reduce(function (a, b) { return (counts[a] > counts[b] ? a : b); }, '');
};
exports.mostCommonDomain = mostCommonDomain;
// Function to get locations of German users
var getGermanLocations = function () {
    return users_1.users
        .filter(function (user) { return user.nationality === 'DE'; })
        .map(function (user) { return "".concat(user.location.city, ", ").concat(user.location.state, ", ").concat(user.location.country); });
};
exports.getGermanLocations = getGermanLocations;
// Function to get users with non-numeric postcodes
var getUsersWithNonNumericPostcode = function () {
    return users_1.users.filter(function (user) { return isNaN(Number(user.location.postcode)); });
};
exports.getUsersWithNonNumericPostcode = getUsersWithNonNumericPostcode;
/*
// Function to get users with mismatched name and email
const getUsersWithMismatchedNameAndEmail = (): { name: string; email: string }[] => {
  return users.filter(user => !user.email.includes(user.name.first) && !user.email.includes(user.name.last))
              .map(user => ({ name: `${user.name.first} ${user.name.last}`, email: user.email }));
};
*/
var getUsersWithMismatchedNameAndEmail = function () {
    return users_1.users.filter(function (user) {
        var emailLower = user.email.toLowerCase();
        var firstNameLower = user.name.first.toLowerCase();
        var lastNameLower = user.name.last.toLowerCase();
        return !emailLower.includes(firstNameLower) && !emailLower.includes(lastNameLower);
    }).map(function (user) { return ({
        name: "".concat(user.name.first, " ").concat(user.name.last),
        email: user.email
    }); });
};
exports.getUsersWithMismatchedNameAndEmail = getUsersWithMismatchedNameAndEmail;
// Function to get users with invalid IDs
// Function to get users with invalid IDs
var getUsersWithInvalidID = function () {
    var subcadenas = ["undefined", "NaN", "cadena3"];
    return users_1.users.filter(function (user) { return !user.id.value || user.id.value.includes(subcadenas[0]) || user.id.value.includes(subcadenas[1]); });
};
exports.getUsersWithInvalidID = getUsersWithInvalidID;
