import { countryToRegion } from "./countryToRegion.js";

export function filterUsers(
    users,
    region,
    age1,
    age2,
    gender,
    onlyFavorite = false,
    onlyWithPhoto = false
) {
    return users.filter((user) => {
        let withPhoto = onlyWithPhoto
            ? user["picture_large"] !== "./images/60111.jpg"
            : true;
        let favorite = onlyFavorite ? user["favorite"] === true : true;

        return (
            (region === "all" || countryToRegion[user["country"]] === region) &&
            user["age"] >= age1 &&
            user["age"] <= age2 &&
            (gender === "all" ||
                user["gender"].toLowerCase() === gender.toLowerCase()) &&
            favorite &&
            withPhoto
        );
    });
}

export function sortUsers(users, sortField, isDescending) {
    if (sortField == "age") {
        users.sort((a, b) => a[sortField] - b[sortField]);
    } else if (sortField == "b_day") {
        users.sort((a, b) => new Date(a) - new Date(b));
    } else if (sortField == "country") {
        users.sort((a, b) => {
            if (a[sortField] > b[sortField]) return 1;
            if (a[sortField] < b[sortField]) return -1;
        });
    } else {
        users.sort((a, b) => {
            if (a[sortField] > b[sortField]) return 1;
            if (a[sortField] < b[sortField]) return -1;
        });
    }

    if (isDescending) users.reverse();

    return users;
}

export function filterUsersByRegion(users, region) {
    return users.filter((user) => {
        return countryToRegion[user["country"]] === region;
    });
}

export function filterUsersByAge(users, age1, age2) {
    return users.filter((user) => {
        return user["age"] >= age1 && user["age"] <= age2;
    });
}

export function filterUsersByFavorite(users, onlyFavorite = false) {
    return users.filter((user) => {
        if (onlyFavorite) {
            return user["favorite"] === true;
        } else {
            return user["favorite"] === false;
        }
    });
}

export function filterUsersByGender(users, gender) {
    return users.filter((user) => {
        return user["gender"] === gender;
    });
}
