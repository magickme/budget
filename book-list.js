const setEditModal = (ww) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3200/book/${ww}`, false);
    xhttp.send();

    const book = JSON.parse(xhttp.responseText);

    const {
        ww,
        title,
        line,
        edition
    } = book;

    document.getElementById('ww').value = ww;
    document.getElementById('title').value = title;
    document.getElementById('line').value = line;
    document.getElementById('edition').value = edition;

    document.getElementById('editForm').action = `http://localhost:3200/book/${ww}`;
}

const deleteBook = (isbn) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `https://localhost:3200/book/${ww}`, false);
    xhttp.send();
    location.reload();
}

const loadBooks = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3200/books", false);
    xhttp.send();

    const books = JSON.parse(xhttp.responseText);

    for (let book of books) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.ww}</h6>

                        <div>WW Code: ${book.ww}</div>
                        <div>Title: ${book.title}</div>
                        <div>Game Line: ${book.line}</div>
                        <div>Edition: ${book.edition}</div>

                        <hr>

                        <button type="button" class="btn btn-danger">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editBookModal" onClick="setEditModal(${book.ww})">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
    }
}

loadBooks();