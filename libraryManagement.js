// Self-contained book object with properties and methods.
const book = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  yearPublished: 1925,
  isAvailable: true,

  borrowBook: function () {
    if (this.isAvailable) {
      this.isAvailable = false;
      console.log("Book borrowed successfully.");
    } else {
      console.log("Book is currently unavailable.");
    }
    this.displayDetails();
  },

  returnBook: function () {
    if (!this.isAvailable) {
      this.isAvailable = true;
      console.log("Book returned successfully.");
    } else {
      console.log("Book was not borrowed.");
    }
    this.displayDetails();
  },

  displayDetails: function () {
    console.log("Title: " + this.title);
    if (this.author !== undefined) {
      console.log("Author: " + this.author);
    }
    console.log("Year Published: " + this.yearPublished);
    console.log("Available: " + (this.isAvailable ? "Yes" : "No"));
  },
};

// View initial details.
console.log("Initial Book Details:");
book.displayDetails();
console.log();

// Borrow the book.
console.log("Borrowing Book...");
book.borrowBook();
console.log();

// Return the book.
console.log("Returning Book...");
book.returnBook();
console.log();

// Add a new property.
console.log("Adding new property 'genre'...");
book.genre = "Classic Fiction";
console.log("Updated Book Object:", book);
console.log();

// Update an existing property.
console.log("Updating 'yearPublished'...");
book.yearPublished = 1926;
console.log("Updated Book Object:", book);
console.log();

// Remove an existing property.
console.log("Deleting 'author' property...");
delete book.author;
console.log("Updated Book Object:", book);
