// Initialize an array to store the books
let myLibrary = [];

// Counter to generate unique IDs for each book
let bookIdCounter = 1;

// Define the Book constructor function
function Book(title, author, pages, datePublished) {
    this.id = bookIdCounter++; // Assign a unique ID to each book
    this.title = title;        // Title of the book
    this.author = author;      // Author of the book
    this.pages = pages;        // Page count of the book
    this.datePublished = datePublished; // Publication date of the book
    this.isRead = false; // Is read boolean
}

Book.prototype.toggleIsRead = function() {
    this.isRead = !this.isRead;
    console.log(`Book ${this.title} is read: ${this.isRead}`)
    renderBooks()
    return this.isRead
}

// Function to open a sidebar by setting its width
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
}

// Function to close the sidebar by resetting its width
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}

// Helper function to check if a date input is valid
function isNotDate(dateVariable) {
    const date = new Date(dateVariable);
    return isNaN(date.getTime()); // Returns true if the date is invalid
}

// Function to delete a book by its unique ID
function deleteBook(id) {
    // Filter out the book with the matching ID from the array
    myLibrary = myLibrary.filter((book) => book.id !== id);
    renderBooks(); // Re-render the updated book list
}

// Function to handle form submission and add a new book
function submitBook() {
    const title = document.getElementById("text-input-box").value;
    const author = document.getElementById("author-input-box").value;
    const pageCount = Number(document.getElementById("page-count-input-box").value);
    const datePublished = document.getElementById("date-published-input-box").value;

    // Check that all input fields are filled
    if ([title, author, pageCount, datePublished].some(value => value === "")) {
        alert("All fields must be filled in");
        return;
    }

    // Validate the page count
    if (isNaN(pageCount) || pageCount <= 0) {
        alert("Page count must be a positive number, not a string. Ex: 150");
        return;
    }

    // Validate the date published input
    if (isNotDate(datePublished)) {
        alert("Date Published must be a valid date in the form of MM/DD/YYYY");
        return;
    }

    // Create a new book object and add it to the library
    const newBook = new Book(title, author, pageCount, datePublished);
    addBookToLibrary(newBook);

    // Close the form sidebar and re-render the updated book list
    closeNav();
    renderBooks();

    // Clear the form input fields for the next entry
    document.getElementById("text-input-box").value = "";
    document.getElementById("author-input-box").value = "";
    document.getElementById("page-count-input-box").value = "";
    document.getElementById("date-published-input-box").value = "";
}

// Function to add a new book object to the library array
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Function to render the books in the library on the HTML page
function renderBooks() {
    const bookShelf = document.getElementById("bookShelf");
    bookShelf.innerHTML = ""; // Clear previous content before rendering

    // Loop through the library and render each book in chunks (rows)
    for (let i = 0; i < myLibrary.length; i += rowElementNumber) {
        const chunk = myLibrary.slice(i, i + rowElementNumber); // Get a chunk of books for the row

        const row = document.createElement('div'); // Create a row container
        row.classList.add('bookRow');

        // Loop through each book in the chunk to create individual tiles
        for (const book of chunk) {
            const bookTile = document.createElement('div'); // Container for each book
            bookTile.style.display = 'flex';
            bookTile.style.flexDirection = 'column';
            bookTile.style.width = '100%';
            bookTile.style.padding = '5px';
            bookTile.style.border = "1px solid black";
            bookTile.classList.add("bookTile");

            // Display each property of the book except the id
            Object.keys(book).forEach((key) => {
                if (key !== 'id') { // Skip displaying the ID in the HTML
                    const textNode = document.createElement("div");
                    textNode.textContent = key === "pages" ? `Page Count: ${book[key]}` : book[key]; // Custom label for page count
                    textNode.style.width = '100%';
                    textNode.style.textAlign = 'center';
                    bookTile.appendChild(textNode); // Add text to book tile
                }
            });
            
            const buttonBox = document.createElement("div");
            buttonBox.style.display = "flex";
            // Create a delete button for each book
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-button");
            deleteBtn.textContent = "Delete!";

            const isReadBtn = document.createElement("button");
            isReadBtn.classList.add("is-read-button");
            isReadBtn.textContent = "Read!";
            // Add an event listener for the delete button using the unique ID
            deleteBtn.addEventListener("click", () => deleteBook(book.id));
            isReadBtn.addEventListener("click", () => book.toggleIsRead());
            buttonBox.appendChild(deleteBtn);
            buttonBox.appendChild(isReadBtn);
            bookTile.appendChild(buttonBox); // Add button to book tile

            row.appendChild(bookTile); // Add the book tile to the row
        }

        bookShelf.appendChild(row); // Add the row to the bookshelf
    }
}

// Sample books for initial display
let wayOfKings = new Book("Way Of Kings", "Brandon Sanderson", 1001, "08/31/2010");
let wordsOfRadiance = new Book("Words of Radiance", "Brandon Sanderson", 1088, "03/04/2014");
let oathbringer = new Book("Oathbringer", "Brandon Sanderson", 1264, "11/14/2017");
let rhythmOfWar = new Book("Rhythm of War", "Brandon Sanderson", 1232, "11/17/2020");

// Add sample books to the library
addBookToLibrary(wayOfKings);
addBookToLibrary(wordsOfRadiance);
addBookToLibrary(oathbringer);
addBookToLibrary(rhythmOfWar);

// Number of items per row
let rowElementNumber = 3;

// Initial render of the bookshelf
renderBooks();
