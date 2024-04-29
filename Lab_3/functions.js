const { randomUserMock, additionalUsers } = require("./FE4U-Lab3-mock");

/// Task - 1
function parseData(randomUserMock, additionalUsers) {
    const courses = [
        "Mathematics",
        "Physics",
        "English",
        "Computer Science",
        "Dancing",
        "Chess",
        "Biology",
        "Chemistry",
        "Law",
        "Art",
        "Medicine",
        "Statistics",
    ];

    function changeFormat(user) {
        return {
            gender: user.gender,
            title: user.name.title,
            full_name: `${user.name.first} ${user.name.last}`,
            city: user.location.city,
            state: user.location.state,
            country: user.location.country,
            postcode: user.location.postcode,
            coordinates: user.location.coordinates,
            timezone: user.location.timezone,
            email: user.email,
            b_date: user.dob.date,
            age: user.dob.age,
            phone: user.phone,
            picture_large: user.picture.large,
            picture_thumbnail: user.picture.thumbnail,
        };
    }

    function addFields(users) {
        let index = 1;

        return users.map((user) => {
            const newUser = { ...user };
            newUser.id = index++;
            newUser.favorite = false;
            newUser.bg_color = null;
            newUser.note = null;
            newUser.course =
                courses[Math.floor(Math.random() * courses.length)];
            return newUser;
        });
    }

    function mergeUsers(lhs_users, rhs_users) {
        const all_users = [...lhs_users, ...rhs_users];

        return all_users.filter(
            (user, index, self) =>
                index === self.findIndex((frst) => frst.email === user.email)
        );
    }

    const formattedRandomUsers = randomUserMock.map(changeFormat);

    const usersWithFieldsAndCourse = addFields(formattedRandomUsers);

    const mergedUsers = mergeUsers(usersWithFieldsAndCourse, additionalUsers);

    return mergedUsers;
}

/// Task - 2
function validate(object) {
    function isUpperCase(c) {
        return c === c.toUpperCase();
    }

    const is_valid = Object.keys(object).every((key) => {
        switch (key) {
            case "full_name":
                return (
                    typeof object[key] === "string" &&
                    isUpperCase(object[key].charAt(0))
                );
            case "gender":
                return (
                    typeof object[key] === "string" &&
                    isUpperCase(object[key].charAt(0))
                );
            case "note":
                return (
                    typeof object[key] === "string" &&
                    isUpperCase(object[key].charAt(0))
                );
            case "state":
                return (
                    typeof object[key] === "string" &&
                    isUpperCase(object[key].charAt(0))
                );
            case "city":
                return (
                    typeof object[key] === "string" &&
                    isUpperCase(object[key].charAt(0))
                );
            case "country":
                return (
                    typeof object[key] === "string" &&
                    isUpperCase(object[key].charAt(0))
                );
            case "age":
                return typeof object[key] === "number";
            case "phone":
                return (
                    typeof object[key] === "string" &&
                    /^\d{3}-\d{7}$/.test(object[key])
                );
            case "email":
                return (
                    typeof object[key] === "string" && object[key].includes("@")
                );
            default:
                return true;
        }
    });

    return is_valid;
}

/// Task - 3
function filterUsers(users, country, age, gender, favorite) {
    return (filteredUsers = users.filter(
        (user) =>
            user["age"] == age &&
            user["gender"] == gender &&
            user["country"] == country &&
            user["favorite"] == favorite
    ));
}

/// Task - 4
function sortUsers(users, sortBy, sortOrder) {
    return users.sort((lhs, rhs) => {
        if (typeof lhs[sortBy] === "number") {
            return sortOrder === "asc"
                ? lhs[sortBy] - rhs[sortBy]
                : rhs[sortBy] - lhs[sortBy];
        } else if (typeof lhs[sortBy] === "string") {
            return sortOrder === "asc"
                ? lhs[sortBy].localeCompare(rhs[sortBy])
                : rhs[sortBy].localeCompare(lhs[sortBy]);
        } else {
            return 0;
        }
    });
}

module.exports = { parseData, validate, filterUsers, sortUsers };
