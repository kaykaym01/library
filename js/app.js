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
 * @param {Book} book 
 */
function addBooktoDisplay(book) {
    libraryTable = document.querySelector(".library-table tbody");
    newRow = document.createElement("tr");
    newRow.classList.add("library-row")

    bookTitle = document.createElement("td");
    bookTitle.textContent = book.title;
    newRow.append(bookTitle);

    bookAuthor = document.createElement("td");
    bookAuthor.textContent = book.author;
    newRow.append(bookAuthor);

    bookNumPages = document.createElement("td");
    bookNumPages.textContent = book.numPages;
    newRow.append(bookNumPages);

    bookReadStatus = document.createElement("td");
    bookReadStatus.textContent = (book.haveRead) ? "Have Read" : "Have Not Read";
    newRow.append(bookReadStatus);

    libraryTable.append(newRow);
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
    myLibrary.forEach(book => {
        addBooktoDisplay(book);
    })
}

/**
 * Shows the form to add new books
 */
function showNewBookForm() {
    newBookForm = document.querySelector(".new-book-form");
    newBookForm.style.display = "block";
}

/**
 * Hides the form to add new books
 */
function hideNewBookForm() {
    newBookForm = document.querySelector(".new-book-form");
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
        newBookForm.elements["bookReadStatus"].value = "";
    }
}

addNewBookButton = document.querySelector(".new-book-btn");
addNewBookButton.addEventListener("click", showNewBookForm);

closeNewBookLink = document.querySelector(".close-form-link");
closeNewBookLink.addEventListener("click", hideNewBookForm);

addToLibraryButton = document.querySelector(".new-book-form-submit-btn");
addToLibraryButton.addEventListener("click", clickToAddToLibrary);