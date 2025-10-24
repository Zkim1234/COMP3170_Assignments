import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function AddingNew({ onAddBook, editingBook, onUpdateBook, onCancelEdit }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    imageLink: "",
  });

  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title || "",
        author: editingBook.author || "",
        imageLink: editingBook.image || "",
      });
    } else {
      setFormData({
        title: "",
        author: "",
        imageLink: "",
      });
    }
  }, [editingBook]);

  useEffect(() => {
    if (editingBook) {
      const dialog = document.getElementById("addBookDialog");
      dialog.showModal();
    }
  }, [editingBook]);

  function handleClick(e) {
    if (!editingBook) {
      e.target.querySelector("dialog").showModal();
    }
  }

  function handleClose() {
    const dialog = document.getElementById("addBookDialog");
    dialog.close();
    setFormData({
      title: "",
      author: "",
      imageLink: "",
    });
    if (editingBook && onCancelEdit) {
      onCancelEdit();
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAddBook(e) {
    e.preventDefault();

    if (editingBook) {
      const updatedBook = {
        ...editingBook,
        id: editingBook.isbn13 || editingBook.id,
        title: formData.title,
        author: formData.author,
        image: formData.imageLink,
      };
      onUpdateBook(updatedBook);
    } else {
      const newBook = {
        id: nanoid(),
        title: formData.title,
        author: formData.author,
        image: formData.imageLink,
      };
      onAddBook(newBook);
    }

    setFormData({
      title: "",
      author: "",
      imageLink: "",
    });

    handleClose();
  }

  return (
    <div className="newContainer" onClick={(e) => handleClick(e)}>
      <dialog id="addBookDialog">
        <p className="formLabel">
          Add New Book
        </p>
        <form id="addBookForm" onSubmit={handleAddBook}>
          <div className="formControls">
            <label>
              Title:
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="formControls">
            <label>
              Author:
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="formControls">
            <label>
              Book Image Link:
              <input
                type="text"
                name="imageLink"
                placeholder="https://"
                value={formData.imageLink}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="formButtons">
            <button className="addBookButton" type="submit">
              Add Book
            </button>
            <button className="closeButton" type="button" onClick={handleClose}>
              Close
            </button>
          </div>
        </form>
      </dialog>

      <h3> + Add Book</h3>
    </div>
  );
}

export default AddingNew;
