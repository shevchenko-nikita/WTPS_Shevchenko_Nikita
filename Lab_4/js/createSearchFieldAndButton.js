import { searchAndShowTeacher } from "./searchAndShowTeacher.js";

function createSearchFieldAndButton() {
    let searchBlock = document.getElementById('header-search-block');

    let field = document.createElement('input');
    field.type = 'text';
    field.className = 'header-search-field';
    field.id = 'header-search-field';
    field.name = 'search';
    field.placeholder = 'Name, note or age to search';
    let button = document.createElement('button');
    button.id = 'search-button';
    button.className = 'btn-search';
    button.type = 'button';
    button.textContent = 'Search';
    button.onclick = function () {
        searchAndShowTeacher()
    }

    searchBlock.appendChild(field);
    searchBlock.appendChild(button);
}

createSearchFieldAndButton()