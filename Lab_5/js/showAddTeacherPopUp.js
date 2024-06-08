import { loadAndDisplayStatistics } from "./loadAndDisplayStatistics.js";
import { teachers } from "./loadUsers.js";
import { updateTopteachersGrid } from "./updateTopTeachersGrid.js";

export function hideAddTeacherPopUp() {
    let popup = document.getElementById("add-teacher-popup");
    if (popup) {
        document.body.removeChild(popup);
    }
}

function getAgeFromBirthDate(birthDate) {
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
}

export function showAddTeacherPopUp() {
    let popup = document.createElement("div");
    popup.id = "add-teacher-popup";
    popup.className = "add-teacher-popup popup";

    popup.innerHTML = `
        <div class="popup-content add-teacher-popup-content">
            <div class="popup-header">
                <h3>Add Teacher</h3>
                <img id="close-add-teacher-button" src="images/cross.png" alt="Close"">
            </div>

            <form class="add-teacher-form">
                <label for="name">Name</label><br>
                <input
                    class="add-teacher-form-input add-teacher-form-input-margin-top add-teacher-form-input-margin-bottom"
                    type="text" name="name" id="name" placeholder="Enter name" required>


                <label for="speciality">Speciality</label><br>
                <select
                    class="add-teacher-form-input add-teacher-form-input-margin-top add-teacher-form-input-margin-bottom"
                    name="speciality" id="speciality">
                    <option value="Mathematics">Mathematics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Art">Art</option>
                    <option value="English">English</option>
                    <option value="Biology">Biology</option>
                </select>

                <div class="form-row-with-two-fields add-teacher-form-input-margin-bottom">
                    <div class="form-row-field">
                        <label for="country">Country</label><br>
                        <select class="add-teacher-form-input add-teacher-form-input-margin-top" name="country"
                            id="country">
                            <option value="Ukraine">Ukraine</option>
                            <option value="Germany">Germany</option>
                            <option value="Spain">Spain</option>
                            <option value="USA">USA</option>
                            <option value="France">France</option>
                        </select>
                    </div>

                    <div class="form-row-field">
                        <label for="city">City</label><br>
                        <input class="add-teacher-form-input add-teacher-form-input-margin-top" type="text" name="city"
                            id="city" required>
                    </div>
                </div>

                <div class="form-row-with-two-fields add-teacher-form-input-margin-bottom">
                    <div class="form-row-field">
                        <label for="email">Email</label><br>
                        <input class="add-teacher-form-input add-teacher-form-input-margin-top" type="email"
                            name="email" id="email" required>
                    </div>

                    <div class="form-row-field">
                        <label for="phone_number">Phone</label><br>
                        <input class="add-teacher-form-input add-teacher-form-input-margin-top" type="tel"
                            name="phone_number" id="phone_number" required>
                    </div>
                </div>

                <label for="birth-date">Date of birth:</label><br>
                <div class="form-row-field">
                    <input
                        class="add-teacher-form-input add-teacher-form-input-margin-top add-teacher-form-input-margin-bottom"
                        type="date" name="birth-date" id="birth-date" placeholder="MM/DD/YYYY" required>
                </div>

                <div class="form-row add-teacher-form-input-margin-bottom">
                    <p>Sex</p>
                    <label for="gender-male">Male</label>
                    <input type="radio" name="gender" id="gender-male" value="Male" required>
                    <label for="gender-female">Female</label>
                    <input type="radio" name="gender" id="gender-female" value="Female" required>
                </div>

                <div class="form-row add-teacher-form-input-margin-bottom">
                    <p>Background color</p>
                    <input type="color" name="background-color" id="background-color">
                </div>


                <label for="notes">Notes (optional)</label><br>
                <textarea class="add-teacher-form-input-margin-top add-teacher-form-input-margin-bottom" name="notes"
                    id="notes" required></textarea>

                <button id="add-teacher-button" type="button" class="btn">Add</button>
            </form>
        </div>
        `;

    document.body.appendChild(popup);

    let addButton = document.getElementById("add-teacher-button");
    addButton.onclick = function () {
        const name = document.getElementById("name").value;
        const speciality = document.getElementById("speciality").value;
        const country = document.getElementById("country").value;
        const city = document.getElementById("city").value;
        const email = document.getElementById("email").value;
        const phoneNumber = document.getElementById("phone_number").value;
        const birthDate = document.getElementById("birth-date").value;
        const genderMale = document.getElementById("gender-male");
        const genderFemale = document.getElementById("gender-female");
        const backgroundColor =
            document.getElementById("background-color").value;
        const notes = document.getElementById("notes").value;

        let isBirthDateValid =
            birthDate !== undefined &&
            birthDate !== null &&
            String(birthDate).length > 0;
        let isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            email
        );
        let isPhoneValid =
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
                phoneNumber
            );

        // if (
        //     name.length < 3 ||
        //     city.length < 2 ||
        //     !isEmailValid ||
        //     !isPhoneValid ||
        //     !isBirthDateValid ||
        //     notes.length < 3 ||
        //     ((genderMale === null || !genderMale.checked) &&
        //         (genderFemale === null || !genderFemale.checked))
        // ) {
        //     return;
        // }

        let teacher = {
            id: teachers.length + 1,
            gender: genderMale.checked ? "male" : "female",
            title: null,
            full_name: name,
            city: city,
            state: null,
            country: country,
            postcode: null,
            coordinates: null,
            timezone: null,
            email: email,
            b_day: birthDate,
            age: parseInt(String(getAgeFromBirthDate(new Date(birthDate)))),
            phone: phoneNumber,
            picture_large: "./images/60111.jpg",
            picture_thumbnail: "./images/60111.jpg",
            favorite: false,
            course: speciality,
            bg_color: backgroundColor,
            note: notes,
        };

        teachers.push(teacher);
        hideAddTeacherPopUp();
        updateTopteachersGrid();
        loadAndDisplayStatistics(teachers, 1);
    };

    let closeAddTeacherButton = document.getElementById(
        "close-add-teacher-button"
    );
    closeAddTeacherButton.onclick = function () {
        hideAddTeacherPopUp();
    };
}
