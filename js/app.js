let myLibrary = [];

/**
 * Represents a book.
 * @constructor
 * @param {string} title - Title of the book
 * @param {string} author - Author of the book
 * @param {number} numPages - Number of pages in the book
 * @param {boolean} haveRead - Has the user read this book
 */
function Book(title, author, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
}

/**
 * Adds a new book to the library
 * @param {string} title - Title of the book
 * @param {string} author - Author of the book
 * @param {number} numPages - Number of pages in the book
 * @param {boolean} haveRead - Has the user read this book
 */
function addBookToLibrary(title, author, numPages, haveRead) {
    let newBook = new Book(title, author, numPages, haveRead);
    myLibrary.push(newBook);
}

/**
 * Adds a book to the library display
 * @param {number} index
 * @param {Book} book 
 */
function addBooktoDisplay(index, book) {
    let libraryTable = document.querySelector(".library-table tbody");
    let newRow = document.createElement("tr");
    newRow.classList.add("library-row")
    newRow.setAttribute("data-key", index);

    let bookTitle = document.createElement("td");
    bookTitle.textContent = book.title;
    newRow.append(bookTitle);

    let bookAuthor = document.createElement("td");
    bookAuthor.textContent = book.author;
    newRow.append(bookAuthor);

    let bookNumPages = document.createElement("td");
    bookNumPages.textContent = book.numPages;
    newRow.append(bookNumPages);

    let bookReadStatus = document.createElement("td");
    let bookReadDropdown = document.createElement("select");
    bookReadDropdown.addEventListener("change", updateReadStatus);
    bookReadDropdown.setAttribute("name", "readStatus");
    bookReadDropdown.setAttribute("data-key", index);
    bookReadDropdown.classList.add("book-read-dropdown");

    let haveRead = document.createElement("option");
    haveRead.setAttribute("value", "true");
    haveRead.textContent = "Have Read";
    bookReadDropdown.append(haveRead);

    let haveNotRead = document.createElement("option");
    haveNotRead.setAttribute("value", "false");
    haveNotRead.textContent = "Have Not Read";
    bookReadDropdown.append(haveNotRead);

    bookReadDropdown.value = (book.haveRead) ? "true" : "false";

    bookReadStatus.append(bookReadDropdown);
    newRow.append(bookReadStatus);

    let bookDelete = document.createElement("td");
    let bookDeleteBtn = document.createElement("button");
    bookDeleteBtn.textContent = "Delete";
    bookDeleteBtn.classList.add("delete-btn");
    bookDeleteBtn.addEventListener("click", deleteBook);
    bookDeleteBtn.setAttribute("data-key", index);
    bookDelete.append(bookDeleteBtn);
    newRow.append(bookDelete);

    libraryTable.append(newRow);
}

/**
 * 
 * Updates the read status of the book in the library from dropdown
 */
function updateReadStatus() {
    let index = this.getAttribute("data-key");
    myLibrary[index].haveRead = this.value == "true";
}

/**
 * Removes a book from the library using the data-key attribute
 */
function deleteBook(e) {
    let index = this.getAttribute("data-key");
    myLibrary.splice(index, 1);
    displayLibrary();
}

/**
 * Clears rows from the library display table
 */
function clearLibraryDisplay() {
    const libraryTableRows = document.querySelector(".library-table tbody");
    while (libraryTableRows.firstChild) {
        libraryTableRows.removeChild(libraryTableRows.firstChild);
    }
}

/**
 * Displays all books in myLibrary in the library table
 */
function displayLibrary() {
    clearLibraryDisplay();
    for (const [index, book] of myLibrary.entries()) {
        addBooktoDisplay(index, book);
    }
}

/**
 * Shows the form to add new books
 */
function showNewBookForm() {
    let newBookForm = document.querySelector(".new-book-form");
    newBookForm.style.display = "block";
}

/**
 * Hides the form to add new books
 */
function hideNewBookForm() {
    let newBookForm = document.querySelector(".new-book-form");
    newBookForm.style.display = "none";
}

/**
 * Validates whether the form is valid based on if required fields (book title, book author) are filled 
 * @param {string} bookTitle - The title of the book
 * @param {string} bookAuthor - The author of the book
 * @returns 
 */
function validateNewBookForm(bookTitle, bookAuthor) {

    if (!bookTitle || !bookAuthor) {
        alert("Required fields missing");
        return false;
    }
    return true;
}

/**
 * On click, will add a new book to the library using values in new book form
 */
function clickToAddToLibrary() {
    const newBookForm = document.forms['new-book-form'];
    let bookTitle = newBookForm.elements["bookTitle"].value;
    let bookAuthor = newBookForm.elements["bookAuthor"].value;
    let bookNumPages = newBookForm.elements["bookNumPages"].value;
    let bookReadStatus = newBookForm.elements["bookReadStatus"].value == "true";


    if (validateNewBookForm(bookTitle, bookAuthor)) {
        addBookToLibrary(bookTitle, bookAuthor, bookNumPages, bookReadStatus);
        displayLibrary();
        hideNewBookForm();
        newBookForm.elements["bookTitle"].value = "";
        newBookForm.elements["bookAuthor"].value = "";
        newBookForm.elements["bookNumPages"].value = "";
        newBookForm.elements["bookReadStatus"].value = "false";
    }
}

let addNewBookButton = document.querySelector(".new-book-btn");
addNewBookButton.addEventListener("click", showNewBookForm);

let closeNewBookLink = document.querySelector(".close-form-link");
closeNewBookLink.addEventListener("click", hideNewBookForm);

let addToLibraryButton = document.querySelector(".new-book-form-submit-btn");
addToLibraryButton.addEventListener("click", clickToAddToLibrary);

// Add some books to the library
addBookToLibrary("Parable of the Sower", "Octavia Butler", 309, true);
addBookToLibrary("Sister Outsider", "Audre Lorde", 225, false);
displayLibrary();