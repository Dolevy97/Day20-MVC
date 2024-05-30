'use strict'

var gBooks
_createBooks()

function getBooks() {
    return gBooks
}

function removeBook(idx) {
    gBooks.splice(idx, 1)
    _saveBooks()
}

function updateBook(idx, price) {
    gBooks[idx].price = price
    _saveBooks()
}

function addBook(title, price) {
    var newBook = {
        id: makeId(),
        title,
        price,
        imgUrl: 'book.jpg'
    }
    gBooks.unshift(newBook)
    _saveBooks()
}

function _createBooks() {
    gBooks = loadFromStorage('books')
    if (gBooks && gBooks.length !== 0) return
    gBooks = [
        _createBook('Harry Potter and the Deathly Hallows', 60),
        _createBook('A Tale of Two Cities', 80),
        _createBook('The Little Prince', 60)
    ]
    _saveBooks()
}

function _createBook(title, price) {
    return {
        id: makeId(),
        title,
        price,
        imgUrl: 'book.jpg'
    }
}

function _saveBooks() {
    saveToStorage('books', gBooks)
}