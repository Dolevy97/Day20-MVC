'use strict'

var gBooks = [
    {
        id: 'bg4J78',
        title: 'Harry Potter and the Deathly Hallows',
        price: 60,
        imgUrl: 'book.jpg'
    },
    {
        id: 'ba4cv6',
        title: 'A Tale of Two Cities',
        price: 80,
        imgUrl: 'book.jpg'
    },
    {
        id: 'b8a6r1',
        title: 'The Little Prince',
        price: 60,
        imgUrl: 'book.jpg'
    }
]

function getBooks() {
    return gBooks
}

function removeBook(idx) {
    gBooks.splice(idx,1)
}

function updateBook(idx, price) {
    gBooks[idx].price = price
}

function addBook(title, price) {
    var newBook = {
        id:makeId(),
        title,
        price,
        imgUrl: 'book.jpg'
    }
    gBooks.unshift(newBook)
}