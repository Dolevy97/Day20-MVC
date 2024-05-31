'use strict'

var gSuccessTimeout
var gCardViewMode = loadFromStorage('viewMode')
var gFilterBy
var gBooks
_createBooks()

function getBooks(value) {
    if (!value || value === undefined) _createBooks()
    gFilterBy = value.toLowerCase()
    var newBookDisplay = gBooks.filter(book =>
        book.title.substring(0, gFilterBy.length).toLowerCase() === gFilterBy
    )
    gBooks = newBookDisplay
    return gBooks
}

function getBookById(id) {
    return gBooks.find(book => book.id === id)
}

function removeBook(idx) {
    var index = gBooks.findIndex((book) => book.id === idx)
    gBooks.splice(index, 1)
    _saveBooks()
}

function updateBook(id, price) {
    var book = getBookById(id)
    book.price = price
    _saveBooks()
}

function updateRating(id, num) {
    var book = getBookById(id)
    if (book.rating >= 0 && book.rating <= 5) {
        book.rating += num;
    }
    if (book.rating < 0) book.rating = 0
    else if (book.rating > 5) book.rating = 5
    _saveBooks()
}

function addBook(title, price, imgUrl) {
    var newBook = _createBook(title, price, imgUrl)
    gBooks.unshift(newBook)
    _saveBooks()
}

function getExpensiveBooks() {
    var expensive = gBooks.filter(book => book.price > 200)
    return expensive.length
}

function getAverageBooks() {
    var average = gBooks.filter(book => book.price >= 80 && book.price <= 200)
    return average.length
}

function getCheapBooks() {
    var cheap = gBooks.filter(book => book.price < 80)
    return cheap.length
}

function _createBooks() {
    gBooks = loadFromStorage('books')
    if (gBooks && gBooks.length !== 0) return
    gBooks = [
        _createBook('Harry Potter and the Deathly Hallows', 60, 'img/book1.jpg'),
        _createBook('A Tale of Two Cities', 80, 'img/book2.jpg'),
        _createBook('The Little Prince', 60, 'img/book3.jpg')
    ]
    _saveBooks()
}

function _createBook(title, price, imgUrl = 'img/book.jpg') {
    return {
        id: makeId(),
        title,
        price,
        imgUrl,
        rating: 0
    }
}

function _saveBooks() {
    saveToStorage('books', gBooks)
}