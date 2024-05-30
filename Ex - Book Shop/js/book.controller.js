'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    var strHTML = gBooks.map(book => `<tr>
    <td>${book.title}</td>
    <td>$${book.price}</td>
    <td class="btn-td">
        <button class="btn btn-read">Read</button>
        <button class="btn btn-update" onclick="onUpdateBook('${book.id}')">Update</button>
        <button class="btn btn-delete" onclick="onRemoveBook('${book.id}')" >Delete</button>
    </td>
    </tr>`)
    const elTBody = document.querySelector('tbody')
    elTBody.innerHTML = strHTML.join('')
}

function onRemoveBook(id) {
    var bookIdx = gBooks.findIndex((book) => book.id === id)
    removeBook(bookIdx)
    renderBooks()
}

function onUpdateBook(id) {
    var book = gBooks.find((book) => book.id === id)
    var bookIdx = gBooks.findIndex((book) => book.id === id)
    var newPrice = +prompt(`Please enter the new price for the book ${book.title}`)
    updateBook(bookIdx, newPrice)
    renderBooks()
}

function onAddBook() {
    var title = prompt(`I'm glad you want to add a new book! What will be its title?`)
    while (!title) title = prompt(`Please enter a non-empty title for the book`)
    var price = +prompt(`Great! And its price?`)
    addBook(title, price)
    renderBooks()
}