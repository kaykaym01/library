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
function addBookToLibrary(title, author, numPages, haveRead){
    let newBook = new Book(title, author, numPages, haveRead);
    myLibrary.push(newBook);
}

/**
 * Adds a book to the library display
 * @param {Book} book 
 */
function addBooktoDisplay(book){
    libraryTable = document.querySelector(".library-table");
    newRow = document.createElement("tr");

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
 * Displays all books in myLibrary in the library table
 */
function displayLibrary(){
    myLibrary.forEach(book => {
        addBooktoDisplay(book);
    })
}