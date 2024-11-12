const myLibrary = [];

function Book(title, author, pages, datePublished) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.datePublished = datePublished;
}

function addBookToLibrary(book, libraryArray) {
    libraryArray.push(book);
}

let wayOfKings = new Book("Way Of Kings", "Brandon Sanderson", pages=1001, datePublished=Date("08-31-2010"));
let wordsOfRadiance = new Book("Words of Radiance", "Brandon Sanderson", pages=1088, datePublished=Date("03-04-2014"));
let oathbringer = new Book("Oathbringer", "Brandon Sanderson", pages=1264, datePublished=Date("11-14-2017"));
let rhythmOfWar = new Book("Rhythm of War", "Brandon Sanderson", pages=1232, datePublished=Date("11-17-2020"));

addBookToLibrary(wayOfKings, myLibrary);
addBookToLibrary(wordsOfRadiance, myLibrary);
addBookToLibrary(oathbringer, myLibrary);
addBookToLibrary(rhythmOfWar, myLibrary);

numRows = myLibrary / 3;
remainderBooks = myLibrary % 3;
rowElementNumber = 3;

bookShelf = document.getElementById("bookShelf");

for (let i = 0; i < myLibrary.length; i += rowElementNumber) {
    const chunk = myLibrary.slice(i, i + rowElementNumber);
    console.log(chunk);

    row = document.createElement('div');
    row.classList.add(['bookRow']);

    for (bookNum in chunk) {
        bookTile = document.createElement('div');
        bookTile.style.display = 'flex';
        bookTile.style.flexDirection = 'column';
        bookTile.style.width = '100%';
        bookTile.style.padding = '5px';
        bookTile.classList.add(["bookTile"]);

        Object.keys(chunk[bookNum]).forEach(text => {
            const textNode = document.createElement("div");
            if (Number.isInteger(chunk[bookNum][text])) {
                textNode.textContent = `Page Count: ${chunk[bookNum][text]}`;
            } else {
                textNode.textContent = chunk[bookNum][text];
            }
            textNode.style.width = '100%';
            textNode.style.textAlign = 'center';

            bookTile.appendChild(textNode);
        })
        // const title = document.createTextNode(chunk[bookNum]['title']);
        // const author = document.createTextNode(chunk[bookNum]['author']);
        // const pageCount = document.createTextNode(`Page Count: ${chunk[bookNum]['pages']}`);
        // const published = document.createTextNode(chunk[bookNum]['datePublished']);

        // bookTile.appendChild(title);
        // bookTile.appendChild(author);
        // bookTile.appendChild(pageCount);
        // bookTile.appendChild(published);

        row.appendChild(bookTile);
    }
    bookShelf.appendChild(row);
}