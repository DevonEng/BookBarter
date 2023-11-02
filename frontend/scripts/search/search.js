// import { BASE_PATH } from "../../config.js";

let currentPage = 1;
let lastPage = 7371;
let limit = 18;

window.onload = function () {
    fetchBooks(currentPage);
    updatePagination();
};

document.querySelector("#previous-page").addEventListener("click", function (event) {
    event.preventDefault();
    if (currentPage > 1) {
        currentPage--;
        fetchBooks(currentPage);
        updatePagination();
    }
    this.blur();
});

document.querySelector("#next-page").addEventListener("click", function (event) {
    event.preventDefault();
    if (currentPage < lastPage) {
        currentPage++;
        fetchBooks(currentPage);
        updatePagination();
    }
    this.blur();
});

document.querySelector(".btn").addEventListener("click", function (event) {
    event.preventDefault();
    const query = document.querySelector('input[type="text"]').value;
    if (query.trim() === "") {
        fetchBooks(currentPage);
        updatePagination();
    } else {
        fetchFilteredBooks(query, currentPage);
        updatePagination();
    }
    this.blur();
});

document.querySelector('input[name="query"]').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.querySelector('.btn').click();
    }
});

function fetchBooks(page) {
    fetch(`http://localhost:8000/search/all?page=${page}&limit=${limit}`)
        .then((response) => response.json())
        .then(displayBooks)
        .catch(console.error);
}

function fetchFilteredBooks(keyword, page) {
    fetch(`http://localhost:8000/search/query?keywords=${keyword}&page=${page}&limit=${limit}`)
        .then((response) => response.json())
        .then(displayBooks)
        .catch(console.error)
}

function displayBooks(data) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    data.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.className = "card";
        bookDiv.style = "width: 15%;";
        bookDiv.innerHTML = `
            <img src="${book.image_url}" class="card-img-top" alt="${book.title}">
            <div class="card-body">
                <h2 class="card-title">${book.title}</h2>
                <p class="card-text">Author: ${book.author}</p>
                <p class="card-text">Genre: ${book.genre}</p>
            </div>
        `;
        resultsDiv.appendChild(bookDiv);
    });
}

function updatePagination() {
    const pagination = document.getElementsByClassName("pagination");
    const existingPageButtons = pagination[0].getElementsByClassName("page-button");
    
    while (existingPageButtons.length > 0) {
        existingPageButtons[0].parentNode.removeChild(existingPageButtons[0]);
    }

    for (let i = Math.max(1, currentPage - 2); i <= Math.min(lastPage, currentPage + 2); i++) {
        const li = document.createElement("li");
        li.className = "page-item page-button" + (i === currentPage ? " active" : "");
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        li.addEventListener("click", function (event) {
            event.preventDefault();
            currentPage = i;
            fetchBooks(currentPage);
            updatePagination();
        });
        pagination[0].insertBefore(li, document.getElementById("next-page").parentNode);
    }

    document.getElementById("previous-page").parentNode.classList.toggle("disabled", currentPage === 1);
    document.getElementById("next-page").parentNode.classList.toggle("disabled", currentPage === lastPage);
}
