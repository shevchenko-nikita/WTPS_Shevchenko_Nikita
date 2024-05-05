import { showPopUpWithTeacherInfo } from "./showTeacherInfo.js";

function convertFullNameToInitials(fullName) {
    let words = fullName.split(" ");

    let initials = "";

    for (let word of words) {
        let initial = word.charAt(0).toUpperCase();

        initials += initial + ".";
    }

    return initials.slice(0, -1);
}

export function createTeacherCard(teacher) {
    let card = document.createElement("div");
    card.className = "teacher-card";
    card.onclick = function () {
        showPopUpWithTeacherInfo(teacher);
    };

    if (teacher.picture_large !== undefined && teacher.picture_large !== null) {
        let photo = document.createElement("div");
        photo.className = "teacher-card-photo";
        let img = document.createElement("img");
        img.src = teacher.picture_large;
        img.alt = "Teacher photo";
        photo.appendChild(img);
        card.appendChild(photo);
    } else {
        let photo = document.createElement("div");
        photo.className = "teacher-card-photo";
        let img = document.createElement("img");
        img.src = "./images/60111.jpg";
        img.alt = "Teacher photo";
        photo.appendChild(img);
        card.appendChild(photo);

        // let initials = document.createElement("div");
        // initials.className = "teacher-card-initials";
        // let p = document.createElement("p");
        // p.textContent = convertFullNameToInitials(teacher.full_name);
        // initials.appendChild(p);
        // card.appendChild(initials);
    }

    if (teacher.favorite) {
        let starImg = document.createElement("img");
        starImg.className = "teacher-card-star";
        starImg.src = "images/star.png";
        starImg.alt = "star";
        card.appendChild(starImg);
    }

    let fullName = document.createElement("p");
    fullName.className = "teacher-card-full-name";
    fullName.textContent = teacher.full_name;
    card.appendChild(fullName);

    let speciality = document.createElement("p");
    speciality.className = "teacher-card-speciality";
    speciality.textContent = teacher.course;
    card.appendChild(speciality);

    let country = document.createElement("p");
    country.className = "teacher-card-country";
    country.textContent = teacher.country;
    card.appendChild(country);

    return card;
}
