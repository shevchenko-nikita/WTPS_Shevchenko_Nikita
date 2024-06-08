import { createStatisticsTable } from "./createStatisticsTable.js";
import { loadFavoriteSection } from "./loadFavoriteSection.js";
import { filterUsers } from "./filterUsers.js";
import { loadAndDisplayTopTeachers } from "./loadAndDisplayTopTeachers.js";

const cources = [
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

function getRandomSpeciality() {
    return cources[Math.floor(Math.random() * cources.length)];
}

let teachers;
let globalFilteredTeachers;

export async function getUsers() {
    fetch(`https://randomuser.me/api/?results= 50`)
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            let users = responseData.results;

            let formattedUsers = [];
            for (let i = 0; i < users.length; i += 1) {
                let element = users[i];
                formattedUsers[i] = {
                    id: users.indexOf(element) + 1,
                    gender: element.gender,
                    title: element.name.title,
                    full_name: element.name.first + " " + element.name.last,
                    city: element.location.city,
                    state: element.location.state,
                    country: element.location.country,
                    postcode: element.location.postcode,
                    coordinates: element.location.coordinates,
                    timezone: element.location.timezone,
                    email: element.email,
                    b_day: element.dob.date,
                    age: element.dob.age,
                    phone: element.phone,
                    picture_large:
                        element.picture.large != undefined &&
                        element.picture.large != null
                            ? element.picture.large
                            : "./images/60111.jpg",
                    picture_thumbnail: element.picture.thumbnail,
                    favorite: false,
                    course: getRandomSpeciality(cources),
                    bg_color: null,
                    note: `Some notation of ${element.name.first}`,
                };
            }

            let filteredTeachers = filterUsers(
                formattedUsers,
                "all",
                0,
                1000,
                "all"
            );
            globalFilteredTeachers = filteredTeachers;
            teachers = formattedUsers;

            loadFavoriteSection(filteredTeachers);
            createStatisticsTable(filteredTeachers);
            loadAndDisplayTopTeachers(filteredTeachers);
        })
        .then((_) => {
            fetch("db.json")
                .then((response) => {
                    return response.json();
                })
                .then((responseData) => {
                    let users = responseData.teachers;

                    if (users.length === 0) {
                        return;
                    }

                    globalFilteredTeachers.push(
                        ...filterUsers(users, "Europe", 18, 31, "Male")
                    );
                    teachers.push(...users);

                    loadFavoriteSection(globalFilteredTeachers);
                    createStatisticsTable(globalFilteredTeachers);
                    loadAndDisplayTopTeachers(globalFilteredTeachers);
                })
                .catch((error) => {
                    console.error(
                        "There was a problem with the fetch operation:",
                        error
                    );
                });
        })
        .catch((error) => {
            console.error(error);
        });
}

export async function loadAdditionalUsers() {
    fetch(`https://randomuser.me/api/?results=10`)
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            let users = responseData.results;

            let formattedUsers = [];
            for (let i = 0; i < users.length; i += 1) {
                let element = users[i];
                formattedUsers[i] = {
                    id: users.indexOf(element) + 1 + teachers.length,
                    gender: element.gender,
                    title: element.name.title,
                    full_name: element.name.first + " " + element.name.last,
                    city: element.location.city,
                    state: element.location.state,
                    country: element.location.country,
                    postcode: element.location.postcode,
                    coordinates: element.location.coordinates,
                    timezone: element.location.timezone,
                    email: element.email,
                    b_day: element.dob.date,
                    age: element.dob.age,
                    phone: element.phone,
                    picture_large: element.picture.large,
                    picture_thumbnail: element.picture.thumbnail,
                    favorite: false,
                    course: getRandomSpeciality(cources),
                    bg_color: null,
                    note: `Some notation of ${element.name.first}`,
                };
            }

            console.log(formattedUsers);

            let region = document.getElementById("region").value;
            let ageRange = document.getElementById("age").value.split("-");
            let age1 = parseInt(ageRange[0]);
            let age2 = parseInt(ageRange[1]);
            let gender = document.getElementById("sex").value;
            let onlyWithPhoto = document.getElementById("photo").checked;
            let onlyFavorite = document.getElementById("favorites").checked;

            teachers.push(...formattedUsers);
            let filteredTeachers = filterUsers(
                teachers,
                region,
                age1,
                age2,
                gender,
                onlyFavorite,
                onlyWithPhoto
            );
            globalFilteredTeachers = filteredTeachers;

            console.log(teachers);
            console.log(filteredTeachers);

            loadFavoriteSection(filteredTeachers);
            createStatisticsTable(filteredTeachers);
            loadAndDisplayTopTeachers(filteredTeachers);
        });
}

getUsers();

export { teachers, globalFilteredTeachers };
