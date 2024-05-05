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
            ? user["picture_large"] !== "./images/60111.jpg" &&
              user["picture_large"] !== "./images/60111.jpg"
            : true;
        let favorite = onlyFavorite ? user["favorite"] === true : true;

        return (
            countryToRegion[user["country"]] === region &&
            user["age"] >= age1 &&
            user["age"] <= age2 &&
            user["gender"].toLowerCase() === gender.toLowerCase() &&
            favorite &&
            withPhoto
        );
    });
}
