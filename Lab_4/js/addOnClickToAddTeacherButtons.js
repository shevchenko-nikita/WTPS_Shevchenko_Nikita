import { showAddTeacherPopUp } from "./showAddTeacherPopUp.js"

function addOnClickToAddTeacherButtons() {
    let firstButton = document.getElementById('first-add-teacher-button');
    let secondButton = document.getElementById('second-add-teacher-button');

    firstButton.onclick = function() {
        showAddTeacherPopUp();
    }
    secondButton.onclick = function() {
        showAddTeacherPopUp();
    }
}

addOnClickToAddTeacherButtons();