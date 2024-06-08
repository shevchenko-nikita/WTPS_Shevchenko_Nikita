
function isStringWithUppercase(value) {
    if (typeof value !== 'string') return false;

    if (value.length === 0) return false;

    return value.charAt(0) === value.charAt(0).toUpperCase();
}

export function validateUser(user) {
    let name = user['full_name'].split(' ')[0];
    let surname = user['full_name'].split(' ')[1];

    let isNameValidated = isStringWithUppercase(name) && isStringWithUppercase(surname);
    let isSexValidated = typeof user['gender'] === 'string';
    let isCourseValidated = isStringWithUppercase(user['course']);
    let isCountryValidated = isStringWithUppercase(user['country']);
    let isAgeValidated = user['age'] != undefined && user['age'] != null && user['age'] != NaN;

    if (!isNameValidated || !isSexValidated || !isCourseValidated || !isCountryValidated || !isAgeValidated) {
        return false;
    }

    if (isNaN(user['age'])) {
        return false;
    }

    if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(user['phone'])) {
        return false;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user['email'])) {
        return false;
    }

    return true;
}