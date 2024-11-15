const myLibrary = [];
/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    // document.getElementById("main").style.marginLeft = "250px";
}

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    // document.getElementById("main").style.marginLeft = "0";
}

function isNotDate(dateVariable) {
    const date = new Date(dateVariable);
    return isNaN(date.getTime())
}
function submitBook() {
    const title = document.getElementById("text-input-box").value;
    const author = document.getElementById("author-input-box").value;
    const pageCount = Number(document.getElementById("page-count-input-box").value);
    const datePublished = document.getElementById("date-published-input-box").value;

    if ([title, author, pageCount, datePublished].some(value => value === "")) {
        alert("All fields must be filled in");
        return
    }

    if (isNaN(pageCount) || Number(pageCount) <= 0) {
        alert("Page count must be a positive number, not a string. Ex: 150");
        return
    }

    if (isNotDate(datePublished)) {
        alert("Date Published must be a valid date in the form of MM/DD/YYYY");
        return
    }

    const newBook = new Book(title, author, pageCount, datePublished);
    addBookToLibrary(newBook, myLibrary);
    console.log(`adding new book ${newBook}`)
    closeNav();
    renderBooks()

    document.getElementById("text-input-box").value = "";
    document.getElementById("author-input-box").value = "";
    document.getElementById("page-count-input-box").value = "";
    document.getElementById("date-published-input-box").value = "";
}

function renderBooks() {
    bookShelf = document.getElementById("bookShelf");
    bookShelf.innerHTML = "";

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
            bookTile.style.border = "1px solid black";
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

            row.appendChild(bookTile);
        }
        bookShelf.appendChild(row);
    }
}
  
function Book(title, author, pages, datePublished) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.datePublished = datePublished;
}

function addBookToLibrary(book, libraryArray) {
    libraryArray.push(book);
}

let wayOfKings = new Book("Way Of Kings", "Brandon Sanderson", pages=1001, datePublished=Date("08/31/2010"));
let wordsOfRadiance = new Book("Words of Radiance", "Brandon Sanderson", pages=1088, datePublished=Date("03/04/2014"));
let oathbringer = new Book("Oathbringer", "Brandon Sanderson", pages=1264, datePublished=Date("11/14/2017"));
let rhythmOfWar = new Book("Rhythm of War", "Brandon Sanderson", pages=1232, datePublished=Date("11/17/2020"));

addBookToLibrary(wayOfKings, myLibrary);
addBookToLibrary(wordsOfRadiance, myLibrary);
addBookToLibrary(oathbringer, myLibrary);
addBookToLibrary(rhythmOfWar, myLibrary);

numRows = myLibrary / 3;
remainderBooks = myLibrary % 3;
rowElementNumber = 3;

renderBooks();