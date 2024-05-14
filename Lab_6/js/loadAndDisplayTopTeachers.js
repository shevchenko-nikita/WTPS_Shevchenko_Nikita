import { createTeacherCard } from "./createTeacherCard.js";

export function loadAndDisplayTopTeachers(teachers) {
    let grid = document.getElementById('teachers-grid');
    grid.innerHTML = '';

    teachers.forEach(teacher => {
        let card = createTeacherCard(teacher);
        grid.appendChild(card);
    });
}
