'use strict'

function onInit() {
    render()
}

function render() {
    var strHTML = gBooks.map(book => `<tr>
    <td>${book.title}</td>
    <td>$${book.price}</td>
    <td class="btn-td"><button class="btn btn-read">Read</button>
        <button class="btn btn-update">Update</button>
        <button class="btn btn-delete">Delete</button>
    </td>
    </tr>`)
    const elTBody = document.querySelector('tbody')
    elTBody.innerHTML = strHTML.join('')
}


{/*

<tr>
<td>Harry Potter and the Deathly Hallows</td>
<td>$60</td>
<td class="btn-td"><button class="btn btn-read">Read</button>
    <button class="btn btn-update">Update</button>
    <button class="btn btn-delete">Delete</button>
</td>
</tr>

*/}