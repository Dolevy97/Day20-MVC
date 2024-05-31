'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    var className = gCardViewMode ? '' : 'center';
    if (gBooks.length === 0) var strHTML = [`<h2 class='${className}'>No books were found :(</h2>`]
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
    <div class="rating-container">
        <button onclick="onChangeRating('${book.id}',-1)" class="rating-btn subtract-rating-btn">-</button>
        <button class="rating-btn rating-num-btn">${book.rating}</button>
        <button onclick="onChangeRating('${book.id}',1)" class="rating-btn add-rating-btn">+</button>
    </div>

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
    getBooks(elInput.value)
    renderBooks()
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

function onOpenAddModal() {
    const elBackdrop = document.querySelector('.backdrop')
    const elModal = document.querySelector('.add-book-modal')
    elBackdrop.hidden = false
    elModal.hidden = false
}

function onAddBook() {
    var elBookNameInput = document.querySelector('.name-input')
    var elPriceInput = document.querySelector('.price-input')
    var elUrlInput = document.querySelector('.image-url-input')
    if (!elBookNameInput.value || !elPriceInput.value || isNaN(parseInt(elPriceInput.value))) {
        const elReq = document.querySelector('.required')
        elReq.style.opacity = 1
        setTimeout(() => elReq.style.opacity = 0, 1500)
    }
    else {
        elUrlInput.value ? addBook(elBookNameInput.value, elPriceInput.value, elUrlInput.value) : addBook(elBookNameInput.value, elPriceInput.value);
        onHideModal()
        renderBooks()
        successMsg()
    }
}

function onHideModal() {
    var elBookNameInput = document.querySelector('.name-input')
    var elPriceInput = document.querySelector('.price-input')
    var elUrlInput = document.querySelector('.image-url-input')
    const elBackdrop = document.querySelector('.backdrop')
    const elModal = document.querySelector('.add-book-modal')
    elBackdrop.hidden = true
    elModal.hidden = true
    elBookNameInput.value = ''
    elPriceInput.value = ''
    elUrlInput.value = ''
}

function onChangeRating(id, num) {
    updateRating(id, num)
    onReadBook(id)
}