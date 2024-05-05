export function loadAndDisplayStatistics(teachers, pageNumber) {
    let tableBody = document.getElementById('statistics-table-body');
    tableBody.innerHTML = '';

    let teachersSubList = teachers.slice((pageNumber - 1) * 10, pageNumber * 10);

    teachersSubList.forEach(teacher => {
        let tr = document.createElement('tr');

        let tdName = document.createElement('td');
        tdName.textContent = teacher.full_name;
        tr.appendChild(tdName);

        let tdCourse = document.createElement('td');
        tdCourse.textContent = teacher.course;
        tr.appendChild(tdCourse);

        let tdAge = document.createElement('td');
        tdAge.textContent = teacher.age;
        tr.appendChild(tdAge);

        let tdGender = document.createElement('td');
        tdGender.textContent = teacher.gender;
        tr.appendChild(tdGender);

        let tdCountry = document.createElement('td');
        tdCountry.textContent = teacher.country;
        tr.appendChild(tdCountry);

        tableBody.appendChild(tr);
    });
}