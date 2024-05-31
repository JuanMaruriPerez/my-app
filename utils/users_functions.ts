import {User, users} from '../data/users';

/* Function to determine if a password is weak
* It will be weak if it has all lowercase letters and it less that 8 letters long
*/
const isWeakPassword = (password: string): boolean => {
  return password.length < 8 && /^[a-z]*$/.test(password);
};

/* Function to determine if a password is strong
* It will be strong if:
*     - At leat 30 characters long OR
*     - At least 15 characters long and no lowercase letters OR
*     - More than 10 characters and contains 3 types [lowercase,uppercase,digits,special_characters] hasLowerCase || hasUpperCase || hasDigits || hasSpecialChars
*/
const isStrongPassword = (password: string): boolean => {
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasDigits = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
  return (
    password.length >= 30 ||
    (password.length >= 15 && !hasLowerCase ) ||
    (password.length > 10 && ((hasLowerCase && hasUpperCase && hasDigits ) ||
                                ( hasLowerCase && hasUpperCase &&hasSpecialChars) ||
                                  (hasLowerCase && hasSpecialChars && hasDigits) ||
                                    ( hasUpperCase && hasDigits &&hasSpecialChars)))
  );
};

/* Function to get name of all the users that have a weak password.
* It returns Name[] of all users with weak passwords.
*/
const getUsersWithWeakPasswords = (): [string][] => {
  return users
    .filter(user => isWeakPassword(user.login.password))
    .map(user => [user.name.first]);
};
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
const getPasswordStrengthCounts = (): {  weak: number; strong: number; medium: number } => {
  const counts = { weak: 0, strong: 0, medium: 0 };
  users.forEach(user => {
    if (isWeakPassword(user.login.password)) {
      counts.weak++;
    } else if (isStrongPassword(user.login.password)) {
      counts.strong++;
    } else {
      counts.medium++;
    }
  });
  return counts;
};

// Function to reset weak passwords
const resetWeakPasswords = (): void => {
  users.forEach(user => {
    if (isWeakPassword(user.login.password)) {
      user.login.password = "pleaseupdateyourpassword";
    }
  });
};

// Function to sort users by age
const sortUsersByAge = (): User[] => {
  return users.slice().sort((a, b) => a.birthdate.age - b.birthdate.age);
};

// Function to count nationalities
const countNationalities = (): Set<string> => {
  const uniqueNationalities = new Set(users.map(user => user.nationality));
  return uniqueNationalities;
};

// Function to filter users by email domain
const filterUsersByDomain = (domain: string): User[] => {
  return users.filter(user => user.email.endsWith(`@${domain}`));
};

// Function to get most common email domain excluding example.com
const mostCommonDomain = (): string => {
  const domains = users.map(user => user.email.split('@')[1]);
  const counts: { [key: string]: number } = {};
  domains.forEach(domain => {
    //if (domain !== 'example.com') {
      counts[domain] = (counts[domain] || 0) + 1;
    //}
  });
  return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b), '');
};

// Function to get locations of German users
const getGermanLocations = (): string[] => {
    return users
      .filter(user => user.nationality === 'DE')
      .map(user => `${user.location.city}, ${user.location.state}, ${user.location.country}`);
  };
  

// Function to get users with non-numeric postcodes
const getUsersWithNonNumericPostcode = (): User[] => {
  return users.filter(user => isNaN(Number(user.location.postcode)));
};
/*
// Function to get users with mismatched name and email
const getUsersWithMismatchedNameAndEmail = (): { name: string; email: string }[] => {
  return users.filter(user => !user.email.includes(user.name.first) && !user.email.includes(user.name.last))
              .map(user => ({ name: `${user.name.first} ${user.name.last}`, email: user.email }));
};
*/
const getUsersWithMismatchedNameAndEmail = (): { name: string; email: string }[] => {
  return users.filter(user => {
    const emailLower = user.email.toLowerCase();
    const firstNameLower = user.name.first.toLowerCase();
    const lastNameLower = user.name.last.toLowerCase();
    return !emailLower.includes(firstNameLower) && !emailLower.includes(lastNameLower);
  }).map(user => ({
    name: `${user.name.first} ${user.name.last}`,
    email: user.email
  }));
};

// Function to get users with invalid IDs
// Function to get users with invalid IDs
const getUsersWithInvalidID = (): User[] => {
  const subcadenas = ["undefined", "NaN", "cadena3"];
    return users.filter(user => !user.id.value || user.id.value.includes(subcadenas[0]) || user.id.value.includes(subcadenas[1]));
  };
  

// Testing the functions
/*
console.log(isWeakPassword("weak")); // true
console.log(isWeakPassword("superStrong2#454rrffdg43")); // false
console.log(isStrongPassword("superStrong2#454rrffdg43")); // true
*/

// Exporting the functions
export {
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
};
