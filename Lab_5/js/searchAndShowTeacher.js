import { teachers } from "./loadUsers.js";
import { showPopUpWithTeacherInfo } from "./showTeacherInfo.js";
import { updateTopteachersGrid } from "./updateTopTeachersGrid.js";

export function searchAndShowTeacher() {
    let searchFieldValues = document
        .getElementById("header-search-field")
        .value.toLowerCase()
        .split(",");

    let filteredTeachers = teachers.filter((teacher) => {
        for (let value of searchFieldValues) {
            if (value.length > 0) {
                if (
                    teacher["full_name"]
                        .toLocaleLowerCase()
                        .includes(value.toLocaleLowerCase())
                ) {
                    return true;
                }

                if (
                    teacher["country"]
                        .toLocaleLowerCase()
                        .includes(value.toLocaleLowerCase())
                ) {
                    return true;
                }

                if (
                    teacher["note"] !== undefined &&
                    teacher["note"] !== null &&
                    teacher["note"]
                        .toLocaleLowerCase()
                        .includes(value.toLocaleLowerCase())
                ) {
                    return true;
                }

                if (!isNaN(value) && parseInt(value) === teacher["age"]) {
                    return true;
                }
            }
        }

        return false;
    });

    updateTopteachersGrid(filteredTeachers);

    // if (filteredTeachers[0] !== undefined && filteredTeachers[0] !== null) {
    //     console.log(filteredTeachers[0])
    //     // showPopUpWithTeacherInfo(filteredTeachers[0]);
    // }
}
