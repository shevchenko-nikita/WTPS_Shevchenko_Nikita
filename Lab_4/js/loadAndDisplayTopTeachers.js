import { teachers } from "./loadUsers.js";
import { filterUsers } from "./filterUsers.js";
import { createTeacherCard } from "./createTeacherCard.js";

function loadAndDisplayTopTeachers(teachers) {
    let grid = document.getElementById("teachers-grid");
    grid.innerHTML = "";

    teachers.forEach((teacher) => {
        let card = createTeacherCard(teacher);
        grid.appendChild(card);
    });
}

loadAndDisplayTopTeachers(teachers);
