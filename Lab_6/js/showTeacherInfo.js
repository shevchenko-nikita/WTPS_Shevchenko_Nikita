// import { hidePopUpWithTeacherInfo } from "./hideTeacherInfo.js";
import { loadFavoriteSection } from "./loadFavoriteSection.js";
import { teachers } from "./loadUsers.js";
import { updateTopteachersGrid } from "./updateTopTeachersGrid.js";

export function showPopUpWithTeacherInfo(teacher) {
    let popup = document.createElement("div");
    popup.id = "teacher-info-popup";
    popup.className = "teacher-info-popup popup";

    let popupContent = document.createElement("div");
    popupContent.className = "popup-content teacher-info-popup-content";
    popup.appendChild(popupContent);

    let popupHeader = document.createElement("div");
    popupHeader.className = "popup-header";
    popupContent.appendChild(popupHeader);

    let headerTitle = document.createElement("h3");
    headerTitle.textContent = "Teacher Info";
    popupHeader.appendChild(headerTitle);

    let closeImg = document.createElement("img");
    closeImg.src = "images/cross.png";
    closeImg.alt = "Close";
    closeImg.onclick = function () {
        hidePopUpWithTeacherInfo();
    };
    popupHeader.appendChild(closeImg);

    let popupDetailsContainer = document.createElement("div");
    popupDetailsContainer.className = "teacher-info-details-container";
    popupContent.appendChild(popupDetailsContainer);

    let popupDetails = document.createElement("div");
    popupDetails.className = "teacher-info-contact-details";
    popupDetailsContainer.appendChild(popupDetails);

    let teacherPhoto = document.createElement("img");
    teacherPhoto.src = teacher.picture_large;
    teacherPhoto.alt = "Teacher photo";
    popupDetails.appendChild(teacherPhoto);

    let article = document.createElement("article");
    popupDetails.appendChild(article);

    let teacherName = document.createElement("h2");
    teacherName.textContent = teacher.full_name;
    article.appendChild(teacherName);

    let teacherCourse = document.createElement("h4");
    teacherCourse.textContent = teacher.course;
    article.appendChild(teacherCourse);

    let teacherLocation = document.createElement("p");
    teacherLocation.textContent = teacher.city + ", " + teacher.country;
    article.appendChild(teacherLocation);

    let teacherAgeAndGender = document.createElement("p");
    teacherAgeAndGender.textContent = teacher.age + ", " + teacher.gender;
    article.appendChild(teacherAgeAndGender);

    let teacherEmail = document.createElement("a");
    teacherEmail.href = "mailto:" + teacher.email;
    teacherEmail.textContent = teacher.email;
    article.appendChild(teacherEmail);

    let teacherPhone = document.createElement("p");
    teacherPhone.textContent = teacher.phone;
    article.appendChild(teacherPhone);

    let button = document.createElement("button");
    button.textContent = "Favorite";
    button.className = "btn";
    button.onclick = function () {
        let index = teachers.findIndex(
            (teacherInList) => teacherInList.id === teacher.id
        );

        if (teacher["favorite"] === true) {
            teacher["favorite"] = false;
        } else {
            teacher["favorite"] = true;
        }

        teachers[index] = teacher;
        updateTopteachersGrid();
        loadFavoriteSection(teachers);
    };
    article.appendChild(button);

    if (teacher.note !== undefined && teacher.note != null) {
        let popupNote = document.createElement("p");
        popupNote.className = "teacher-info-notes";
        popupNote.textContent = teacher.note;
        popupDetailsContainer.appendChild(popupNote);
    }

    let popupToggleMap = document.createElement("a");
    popupToggleMap.className = "teacher-info-toggle-map";
    popupToggleMap.href = "#";
    popupToggleMap.textContent = "display location";
    popupDetailsContainer.appendChild(popupToggleMap);

    let popupLeafletMap = document.createElement("div");
    popupLeafletMap.className = "leaflet-map";
    popupLeafletMap.id = "map";
    popupDetailsContainer.appendChild(popupLeafletMap);

    popupToggleMap.onclick = function () {
        var mapElement = document.querySelector("#map");

        if (!mapElement) {
            console.error("Map container not found");
            return;
        }

        var currentDisplay = window
            .getComputedStyle(mapElement)
            .getPropertyValue("display");

        if (currentDisplay === "none") {
            mapElement.style.display = "block";
            initializeMap();
        } else {
            mapElement.style.display = "none";
        }
    };

    function initializeMap() {
        var map = L.map("map").setView(
            {
                lng: parseFloat(teacher.coordinates.longitude),
                lat: parseFloat(teacher.coordinates.latitude),
            },
            13
        );
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
        var marker = L.marker({
            lng: parseFloat(teacher.coordinates.longitude),
            lat: parseFloat(teacher.coordinates.latitude),
        }).addTo(map);
    }

    console.log(
        parseFloat(teacher.coordinates.latitude),
        parseFloat(teacher.coordinates.longitude)
    );
    document.body.appendChild(popup);
}

export function hidePopUpWithTeacherInfo(teacher) {
    let popup = document.getElementById("teacher-info-popup");
    if (popup) {
        document.body.removeChild(popup);
    }
}
