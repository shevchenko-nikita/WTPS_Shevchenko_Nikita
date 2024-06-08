import { loadAndDisplayStatistics } from "./loadAndDisplayStatistics.js";
import { loadAdditionalUsers } from "./loadUsers.js";
import { filterUsersByRegion } from "./filterUsers.js";
import { filterUsersByAge } from "./filterUsers.js";
import { filterUsersByFavorite } from "./filterUsers.js";
import { filterUsersByGender } from "./filterUsers.js";

export function createStatisticsTable(teachers) {
    let teachersList = teachers;

    let piechartContainer = document.getElementById("piechart-container");

    let buttonRow = document.createElement("div");
    buttonRow.className = "button-row";

    let byRegionBtn = document.createElement("button");
    byRegionBtn.textContent = "Region";
    buttonRow.appendChild(byRegionBtn);

    let byAgeBtn = document.createElement("button");
    byAgeBtn.textContent = "Age";
    buttonRow.appendChild(byAgeBtn);

    let byFavoriteBtn = document.createElement("button");
    byFavoriteBtn.textContent = "Favorite";
    buttonRow.appendChild(byFavoriteBtn);

    let bySexBtn = document.createElement("button");
    bySexBtn.textContent = "Sex";
    buttonRow.appendChild(bySexBtn);

    // piechartContainer.appendChild(buttonRow);

    let canvas = document.createElement("canvas");
    canvas.id = "myPieChart";
    canvas.className = "piechart-canvas";
    canvas.width = 100;
    canvas.height = 100;

    piechartContainer.appendChild(canvas);
    piechartContainer.appendChild(buttonRow);

    var category = "Region";
    var myChart = new Chart(canvas, {
        type: "pie",
        data: {
            labels: [
                "Europe",
                "Asia",
                "Africa",
                "Australia",
                "North America",
                "South America",
            ],
            datasets: [
                {
                    label: "Number of Users",
                    data: [
                        filterUsersByRegion(teachersList, "Europe").length,
                        filterUsersByRegion(teachersList, "Asia").length,
                        filterUsersByRegion(teachersList, "Africa").length,
                        filterUsersByRegion(teachersList, "Australia").length,
                        filterUsersByRegion(teachersList, "North America")
                            .length,
                        filterUsersByRegion(teachersList, "South America")
                            .length,
                    ],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.5)",
                        "rgba(54, 162, 235, 0.5)",
                        "rgba(255, 206, 86, 0.5)",
                        "rgba(75, 192, 192, 0.5)",
                        "rgba(153, 102, 255, 0.5)",
                        "rgba(1, 1, 1, 0.5)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(1, 1, 1, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        },
    });

    // Функція для кнопки "By Region"
    byRegionBtn.onclick = function () {
        var newData = [];
        newData.push(filterUsersByRegion(teachersList, "Europe").length),
            newData.push(filterUsersByRegion(teachersList, "Asia").length);
        newData.push(filterUsersByRegion(teachersList, "Africa").length);
        newData.push(filterUsersByRegion(teachersList, "Australia").length);
        newData.push(filterUsersByRegion(teachersList, "North America").length);
        newData.push(filterUsersByRegion(teachersList, "South America").length);
        myChart.data.datasets[0].data = newData;

        var newLabels = [];

        newLabels.push("Europe");
        newLabels.push("Asia");
        newLabels.push("Africa");
        newLabels.push("Australia");
        newLabels.push("North America");
        newLabels.push("South America");
        myChart.data.labels = newLabels;

        myChart.update();
    };

    // Функція для кнопки "By Age"
    byAgeBtn.onclick = function () {
        var newData = [];
        newData.push(filterUsersByAge(teachersList, 18, 31).length);
        newData.push(filterUsersByAge(teachersList, 32, 45).length);
        newData.push(filterUsersByAge(teachersList, 46, 58).length);
        newData.push(filterUsersByAge(teachersList, 59 - 71).length);
        myChart.data.datasets[0].data = newData;

        var newLabels = [];

        newLabels.push("18-31");
        newLabels.push("32-45");
        newLabels.push("46-58");
        newLabels.push("59-71");
        myChart.data.labels = newLabels;

        myChart.update();
    };

    // Функція для кнопки "By Favorite"
    byFavoriteBtn.onclick = function () {
        var newData = [];
        newData.push(filterUsersByFavorite(teachersList, true).length);
        newData.push(filterUsersByFavorite(teachersList, false).length);
        myChart.data.datasets[0].data = newData;

        var newLabels = [];

        newLabels.push("Is favorite");
        newLabels.push("Isn't favorite");
        myChart.data.labels = newLabels;

        myChart.update();
    };

    // Функція для кнопки "By Sex"
    bySexBtn.onclick = function () {
        var newData = [];
        newData.push(filterUsersByGender(teachersList, "male").length);
        newData.push(filterUsersByGender(teachersList, "female").length);
        myChart.data.datasets[0].data = newData;

        var newLabels = [];

        newLabels.push("Male");
        newLabels.push("Female");
        myChart.data.labels = newLabels;

        myChart.update();
    };

    loadAndDisplayStatistics(teachersList, category);
}
