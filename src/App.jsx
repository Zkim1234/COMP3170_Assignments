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

  const [filter, setFilter] = useState('all');
  
  const categories = [...new Set(books.map(book => book.category).filter(Boolean))];
  
  const getDisplayedBooks = () => {
    let filtered = [...books];
    
    switch(filter) {
      case 'all':
        return filtered;
      case 'authorA-Z':
        return filtered.sort((a, b) => (a.author || '').localeCompare(b.author || ''));
      case 'authorZ-A':
        return filtered.sort((a, b) => (b.author || '').localeCompare(a.author || ''));
      case 'titleA-Z':
        return filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      case 'titleZ-A':
        return filtered.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
      default:
        return filtered.filter(book => book.category === filter);
    }
  };
  
  const displayedBooks = getDisplayedBooks();  

  return (
    <div className="appContainer">
      <Header />
        <div className="filterContainer">
          <p>Filter</p>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="authorA-Z">Author A-Z</option>
            <option value="authorZ-A">Author Z-A</option>
            <option value="titleA-Z">Title A-Z</option>
            <option value="titleZ-A">Title Z-A</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
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
            {displayedBooks.map((book, index) => (
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
