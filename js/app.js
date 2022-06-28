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