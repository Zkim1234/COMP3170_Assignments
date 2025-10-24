function Book({ book, isClicked, onBookClick }) {
  function handleClick(e) {
    e.stopPropagation();
    onBookClick();
  }

  return (
    <div
      className={`bookDetails ${isClicked ? "bookClicked" : ""}`}
      onClick={handleClick}
    >
      <div className="imageContainer">
        <img src={book.image} alt={book.title} />
      </div>
      <h3 className="title">{book.title}</h3>
      {book.author && <p className="author">by {book.author}</p>}
      {book.publisher && (
        <p className="publisher">Publisher: {book.publisher}</p>
      )}
      <p className="price">{book.price}</p>
      <button
        className="viewDetailsButton"
        onClick={() => window.open(book.url, "_blank")}
      >
        View Details
      </button>
    </div>
  );
}

export { Book };
