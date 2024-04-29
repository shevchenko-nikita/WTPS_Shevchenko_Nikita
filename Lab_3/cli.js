const { randomUserMock, additionalUsers } = require("./FE4U-Lab3-mock.js");
const functions = require("./functions.js");

/// Task - 1
const formated = functions.parseData(randomUserMock, additionalUsers);
// console.log(formated);

/// Task - 2
const person = {
    full_name: "John Doe",
    gender: "Male",
    note: "Loremipsum",
    state: "California",
    city: "Los Angeles",
    country: "USA",
    age: 25,
    phone: "123-4567899",
    email: "john.doe@example.com",
};
const is_valid = functions.validate(person);
// console.log("Object is valid:", is_valid);

/// Task - 3
const country = "Finland";
const age = 36;
const gender = "male";
const favorite = false;
const filteredUsers = functions.filterUsers(
    formated,
    country,
    age,
    gender,
    favorite
);
// console.log("Filtered Users:", filteredUsers);

/// Task - 4
sorted_users = functions.sortUsers(formated, "age", "desc");
// console.log(sorted_users);
