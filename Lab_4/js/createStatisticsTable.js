import { teachers } from "./loadUsers.js";
import { loadAndDisplayStatistics } from "./loadAndDisplayStatistics.js";

let globalSelectedPage = 1;
let globalIsDescending = false;

export function sortUsers(users, sortField, isDescending) {
    if (sortField == "age") {
        users.sort((a, b) => a[sortField] - b[sortField]);
    } else if (sortField == "b_day") {
        users.sort((a, b) => new Date(a) - new Date(b));
    } else if (sortField == "country") {
        users.sort((a, b) => {
            if (a[sortField] > b[sortField]) return 1;
            if (a[sortField] < b[sortField]) return -1;
        });
    } else {
        users.sort((a, b) => {
            if (a[sortField] > b[sortField]) return 1;
            if (a[sortField] < b[sortField]) return -1;
        });
    }

    if (isDescending) users.reverse();

    return users;
}

function createStatisticsTable() {
    let teachersList = teachers;

    let newThead = document.createElement("thead");

    let tHeadRow = document.createElement("tr");
    let trName = document.createElement("th");
    trName.innerHTML = "<th>Name</th>";
    trName.onclick = function () {
        teachersList = sortUsers(teachers, "full_name", globalIsDescending);
        loadAndDisplayStatistics(teachersList, globalSelectedPage);
        createPagination(teachersList, globalSelectedPage);
        globalIsDescending = !globalIsDescending;
    };
    let trSpecialty = document.createElement("th");
    trSpecialty.innerHTML = "<th>Speciality</th>";
    trSpecialty.onclick = function () {
        teachersList = sortUsers(teachers, "course", globalIsDescending);
        loadAndDisplayStatistics(teachersList, globalSelectedPage);
        createPagination(teachersList, globalSelectedPage);
        globalIsDescending = !globalIsDescending;
    };
    let trAge = document.createElement("th");
    trAge.innerHTML = "<th>Age</th>";
    trAge.onclick = function () {
        teachersList = sortUsers(teachers, "age", globalIsDescending);
        loadAndDisplayStatistics(teachersList, globalSelectedPage);
        createPagination(teachersList, globalSelectedPage);
        globalIsDescending = !globalIsDescending;
    };
    let trGender = document.createElement("th");
    trGender.innerHTML = "<th>Gender</th>";
    trGender.onclick = function () {
        teachersList = sortUsers(teachers, "gender", globalIsDescending);
        loadAndDisplayStatistics(teachersList, globalSelectedPage);
        createPagination(teachersList, globalSelectedPage);
        globalIsDescending = !globalIsDescending;
    };
    let trNationality = document.createElement("th");
    trNationality.innerHTML = "<th>Nationality</th>";
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

    nav.appendChild(ul);
    pagination.appendChild(nav);
}

createStatisticsTable();
