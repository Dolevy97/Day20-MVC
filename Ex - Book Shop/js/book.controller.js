'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    var className = gCardViewMode ? '' : 'center';
    if (gBooks.length === 0) var strHTML = [`<h2 class='${className}'>No available books with this filler :(</h2>`]
    else if (gCardViewMode) {
        var strHTML = gBooks.map(book => `<div class="card">
        <img src="${book.imgUrl}">
        <div class="description">
            <p>${book.title}</p>
            <p>$${book.price}</p>
            <button class="btn btn-read" onclick="onReadBook('${book.id}')">Read</button>
            <button class="btn btn-update" onclick="onUpdateBook('${book.id}')">Update</button>
            <button class="btn btn-delete" onclick="onRemoveBook('${book.id}')">Delete</button>
        </div>
        </div>`)
    } else {
        var strHTML = gBooks.map(book => `<tr>
        <td>${book.title}</td>
        <td>$${book.price}</td>
        <td class="btn-td">
            <button class="btn btn-read" onclick="onReadBook('${book.id}')">Read</button>
            <button class="btn btn-update" onclick="onUpdateBook('${book.id}')">Update</button>
            <button class="btn btn-delete" onclick="onRemoveBook('${book.id}')">Delete</button>
        </td>
        </tr>`)
    }
    const elContainer = document.querySelector('tbody');
    const elCardContainer = document.querySelector('.card-container')
    const elHead = document.querySelector('thead')
    if (!gCardViewMode) {
        elContainer.innerHTML = strHTML.join('')
        elHead.hidden = false
        elCardContainer.innerHTML = ''
    } else {
        elCardContainer.innerHTML = strHTML.join('')
        elHead.hidden = true
        elContainer.innerHTML = ''
    }
    updateStats()
}

function onRemoveBook(id) {
    removeBook(id)
    renderBooks()
    successMsg()
}

function onUpdateBook(id) {
    var newPrice = +prompt(`Please enter the new price for the book.`)
    while (newPrice === NaN || !newPrice) newPrice = +prompt(`Please enter a number for the price that is higher than 0`)

    updateBook(id, newPrice)
    renderBooks()
    successMsg()
}

function onAddBook() {
    var title = prompt(`I'm glad you want to add a new book! What will be its title?`)
    while (!title) title = prompt(`Please enter a non-empty title for the book`)

    var price = +prompt(`Great! And its price?`)
    while (price === NaN || !price) price = +prompt(`Please enter a number for the price`)
    var imgUrl = prompt('If you have an image, please link it here')
    addBook(title, price, imgUrl)
    renderBooks()
    successMsg()
}

function onReadBook(id) {
    const elDialog = document.querySelector('dialog')
    const elPre = elDialog.querySelector('.pre')
    var book = getBookById(id)
    // var strBook = JSON.stringify(book, null, 2)
    var str = `
    <img src="${book.imgUrl}">
    ID: ${book.id}
    Title: ${book.title}
    Price: $${book.price}
    `
    elPre.innerHTML = str
    elDialog.showModal()
}

function onFilterByName(value) {
    getBooks(value)
    renderBooks()
}

function onClearFilter() {
    const elInput = document.querySelector('.filter-input')
    elInput.value = ''
}

function successMsg() {
    var successTimeout
    clearTimeout(successTimeout)
    var elSuccess = document.querySelector('.success')
    elSuccess.style.opacity = 1
    successTimeout = setTimeout(() => {
        elSuccess.style.opacity = 0
    }, 2000)
}

function onToggleView(elBtn) {
    if (elBtn.innerText === 'Table') gCardViewMode = false
    else gCardViewMode = true
    saveToStorage('viewMode', gCardViewMode)
    renderBooks()
}


function updateStats() {
    const elExpensive = document.querySelector('.expensive')
    const elAverage = document.querySelector('.average')
    const elCheap = document.querySelector('.cheap')
    elExpensive.innerText = getExpensiveBooks()
    elAverage.innerText = getAverageBooks()
    elCheap.innerText = getCheapBooks()
}