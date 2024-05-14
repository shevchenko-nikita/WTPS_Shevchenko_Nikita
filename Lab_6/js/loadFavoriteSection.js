import { createTeacherCard } from "./createTeacherCard.js";
import { teachers } from "./loadUsers.js";

export function loadFavoriteSection() {
    let section = document.getElementById("section-favorites");
    section.innerHTML = "";

    let filterTeachers = teachers.filter((teacher) => {
        if (
            teacher["favorite"] !== undefined &&
            teacher["favorite"] !== null &&
            teacher["favorite"]
        ) {
            return true;
        }

        return false;
    });

    if (filterTeachers.length === 0) {
        section.classList.remove("container", "section");
        section.innerHTML = "";
        return;
    }

    section.className = "container section";
    let h2 = document.createElement("h2");
    h2.textContent = "Favorites";
    h2.className = "section-title-paddings";
    section.appendChild(h2);

    let favoritesSlider = document.createElement("div");
    favoritesSlider.className = "favorites-slider";
    section.appendChild(favoritesSlider);

    let favoritesSliderGrid = document.createElement("div");
    favoritesSliderGrid.className = "favorites-slider-grid";
    favoritesSlider.appendChild(favoritesSliderGrid);

    filterTeachers = filterTeachers.slice(0, 5);

    filterTeachers.forEach((teacher) => {
        let card = createTeacherCard(teacher);
        favoritesSliderGrid.appendChild(card);
    });
}
