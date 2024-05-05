import { teachers } from "./loadUsers.js";
import { filterUsers } from "./filterUsers.js";
import { createTeacherCard } from "./createTeacherCard.js";

export function updateTopteachersGrid(alreadyFilteredTeachers) {
    let region = document.getElementById('region').value;
    let ageRange = document.getElementById('age').value.split('-');
    let age1 = parseInt(ageRange[0]);
    let age2 = parseInt(ageRange[1]);
    let gender = document.getElementById('sex').value;
    let onlyWithPhoto = document.getElementById('photo').checked;
    let onlyFavorite = document.getElementById('favorites').checked;

    let filteredTeachers = filterUsers(teachers, region, age1, age2, gender, onlyFavorite, onlyWithPhoto);

    let grid = document.getElementById('teachers-grid');
    grid.innerHTML = '';

    if (alreadyFilteredTeachers !== undefined && alreadyFilteredTeachers !== null) {
        alreadyFilteredTeachers.forEach(teacher => {
            let card = createTeacherCard(teacher);
            grid.appendChild(card);
        });
        return;
    }

    filteredTeachers.forEach(teacher => {
        let card = createTeacherCard(teacher);
        grid.appendChild(card);
    });
}

function onChange() {
    updateTopteachersGrid();
}

document.getElementById('age').addEventListener('change', onChange);
document.getElementById('region').addEventListener('change', onChange);
document.getElementById('sex').addEventListener('change', onChange);
document.getElementById('photo').addEventListener('change', onChange);
document.getElementById('favorites').addEventListener('change', onChange);