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
        <button class="btn btn-update">Update</button>
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