import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AddingNew from "./components/AddingNew.jsx";
import { Book } from "./components/Book.jsx";

function App() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("bookCatalog");
    if (savedBooks) {
      return JSON.parse(savedBooks);
    }
    return [];
  });
  const [clickedBookId, setClickedBookId] = useState(null);
  const [editingBookId, setEditingBookId] = useState(null);

  useEffect(() => {
    localStorage.setItem("bookCatalog", JSON.stringify(books));
  }, [books]);

  function handleAddBook(newBook) {
    setBooks([...books, newBook]);
  }

  function handleBookClick(bookId) {
    if (clickedBookId === bookId) {
      setClickedBookId(null);
    } else {
      setClickedBookId(bookId);
    }
  }
  function handleDeleteBook() {
    if (clickedBookId) {
      setBooks(
        books.filter((book) => (book.isbn13 || book.id) !== clickedBookId)
      );
      setClickedBookId(null); 
    }
  }

  function handleEditBook() {
    if (clickedBookId) {
      setEditingBookId(clickedBookId);
    }
  }

  function handleUpdateBook(updatedBook) {
    setBooks(
      books.map((book) =>
        (book.isbn13 || book.id) === updatedBook.id ? updatedBook : book
      )
    );
    setEditingBookId(null);
    setClickedBookId(null);
  }

  function handleCancelEdit() {
    setEditingBookId(null);
  }

  return (
    <div className="appContainer">
      <Header />
      <main className="section">
        <div className="controls">
          <AddingNew
            onAddBook={handleAddBook}
            editingBook={
              editingBookId
                ? books.find(
                    (book) => (book.isbn13 || book.id) === editingBookId
                  )
                : null
            }
            onUpdateBook={handleUpdateBook}
            onCancelEdit={handleCancelEdit}
          />
          <div className="actionButtons">
            <button
              className="editButton"
              onClick={handleEditBook}
              disabled={!clickedBookId}
            >
              Edit
            </button>
            <button className="deleteButton" onClick={handleDeleteBook}>
              Delete
            </button>
          </div>
        </div>
        <div className="bookContainer">
          <div className="bookList">
            {books.map((book, index) => (
              <Book
                key={book.isbn13 || book.id || index}
                book={book}
                isClicked={clickedBookId === (book.isbn13 || book.id)}
                onBookClick={() => handleBookClick(book.isbn13 || book.id)}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
