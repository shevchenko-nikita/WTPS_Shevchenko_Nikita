import { teachers, globalFilteredTeachers } from "./loadUsers.js";
import { filterUsers } from "./filterUsers.js";
import { createTeacherCard } from "./createTeacherCard.js";
import { createStatisticsTable } from "./createStatisticsTable.js";

export function updateTopteachersGrid(teachersToDisplay) {
    let region = document.getElementById("region").value;
    let ageRange = document.getElementById("age").value.split("-");
    let age1 = parseInt(ageRange[0]);
    let age2 = parseInt(ageRange[1]);
    let gender = document.getElementById("sex").value;
    let onlyWithPhoto = document.getElementById("photo").checked;
    let onlyFavorite = document.getElementById("favorites").checked;

    let filteredTeachers;

    if (teachersToDisplay !== undefined) {
        filteredTeachers = filterUsers(
            teachersToDisplay,
            region,
            age1,
            age2,
            gender,
            onlyFavorite,
            onlyWithPhoto
        );
    } else {
        filteredTeachers = filterUsers(
            teachers,
            region,
            age1,
            age2,
            gender,
            onlyFavorite,
            onlyWithPhoto
        );
    }

    let grid = document.getElementById("teachers-grid");
    grid.innerHTML = "";

    globalFilteredTeachers.length = 0;

    filteredTeachers.forEach((teacher) => {
        globalFilteredTeachers.push(teacher);
        let card = createTeacherCard(teacher);
        grid.appendChild(card);
    });
}

function onChange() {
    updateTopteachersGrid();
    // createStatisticsTable(globalFilteredTeachers);
}

document.getElementById("age").addEventListener("change", onChange);
document.getElementById("region").addEventListener("change", onChange);
document.getElementById("sex").addEventListener("change", onChange);
document.getElementById("photo").addEventListener("change", onChange);
document.getElementById("favorites").addEventListener("change", onChange);
