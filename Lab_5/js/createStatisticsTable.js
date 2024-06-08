import { loadAndDisplayStatistics } from "./loadAndDisplayStatistics.js";
import { loadAdditionalUsers } from "./loadUsers.js";
import { sortUsers } from "./filterUsers.js";

let globalSelectedPage = 1;
let globalIsDescending = false;

export function createStatisticsTable(teachers) {
    let teachersList = teachers;

    let newThead = document.createElement("thead");

    let tHeadRow = document.createElement("tr");
    let img = document.createElement("img");
    img.src = "images/blue-arrow-down.png";
    img.arrow = "arrow";
    img.className = "statistics-table-head-arrow";
    let trName = document.createElement("th");
    trName.innerHTML =
        '<th>Name<img class="statistics-table-head-arrow" src="images/blue-arrow-down.png" arrow="arrow"></th>';
    trName.onclick = function () {
        teachersList = sortUsers(teachers, "full_name", globalIsDescending);
        loadAndDisplayStatistics(teachersList, globalSelectedPage);
        createPagination(teachersList, globalSelectedPage);
        globalIsDescending = !globalIsDescending;
    };
    let trSpecialty = document.createElement("th");
    trSpecialty.innerHTML =
        '<th>Speciality<img class="statistics-table-head-arrow" src="images/blue-arrow-down.png" arrow="arrow"></th>';
    trSpecialty.onclick = function () {
        teachersList = sortUsers(teachers, "course", globalIsDescending);
        loadAndDisplayStatistics(teachersList, globalSelectedPage);
        createPagination(teachersList, globalSelectedPage);
        globalIsDescending = !globalIsDescending;
    };
    let trAge = document.createElement("th");
    trAge.innerHTML =
        '<th>Age<img class="statistics-table-head-arrow" src="images/blue-arrow-down.png" arrow="arrow"></th>';
    trAge.onclick = function () {
        teachersList = sortUsers(teachers, "age", globalIsDescending);
        loadAndDisplayStatistics(teachersList, globalSelectedPage);
        createPagination(teachersList, globalSelectedPage);
        globalIsDescending = !globalIsDescending;
    };
    let trGender = document.createElement("th");
    trGender.innerHTML =
        '<th>Gender<img class="statistics-table-head-arrow" src="images/blue-arrow-down.png" arrow="arrow"></th>';
    trGender.onclick = function () {
        teachersList = sortUsers(teachers, "gender", globalIsDescending);
        loadAndDisplayStatistics(teachersList, globalSelectedPage);
        createPagination(teachersList, globalSelectedPage);
        globalIsDescending = !globalIsDescending;
    };
    let trNationality = document.createElement("th");
    trNationality.innerHTML =
        '<th>Nationality<img class="statistics-table-head-arrow" src="images/blue-arrow-down.png" arrow="arrow"></th>';
    trNationality.onclick = function () {
        teachersList = sortUsers(teachers, "country", globalIsDescending);
        loadAndDisplayStatistics(teachersList, globalSelectedPage);
        createPagination(teachersList, globalSelectedPage);
        globalIsDescending = !globalIsDescending;
    };

    tHeadRow.appendChild(trName);
    tHeadRow.appendChild(trSpecialty);
    tHeadRow.appendChild(trAge);
    tHeadRow.appendChild(trGender);
    tHeadRow.appendChild(trNationality);

    newThead.appendChild(tHeadRow);

    const existingThead = document
        .getElementById("table")
        .getElementsByTagName("thead")[0];

    existingThead.parentNode.replaceChild(newThead, existingThead);

    loadAndDisplayStatistics(teachersList, 1);

    createPagination(teachersList, 1);
}

function createPagination(teachersList, selectedPage) {
    let pagination = document.getElementById("teachers-table-pagination");
    pagination.innerHTML = "";

    let nav = document.createElement("nav");
    let ul = document.createElement("ul");

    let numberOfPages = Math.ceil(teachersList.length / 10);

    if (numberOfPages != 1) {
        for (let i = 1; i <= numberOfPages; i++) {
            let a = document.createElement("a");

            if (selectedPage === i) {
                a.className = "teachers-table-pagination-selected-page-number";
            }

            let li = document.createElement("li");
            li.textContent = String(i);

            a.onclick = function () {
                createPagination(teachersList, i);
                loadAndDisplayStatistics(teachersList, i);
                globalSelectedPage = i;
            };

            a.appendChild(li);
            ul.appendChild(a);
        }
    }

    let a = document.createElement("a");
    let li = document.createElement("li");
    li.textContent = "Next";

    li.onclick = function () {
        loadAdditionalUsers();
    };

    a.appendChild(li);
    ul.appendChild(a);

    nav.appendChild(ul);
    pagination.appendChild(nav);
}

// createStatisticsTable();
