import React, { useState } from "react";
import "./CreateCardForm.css";

const GIPHY_API_KEY = "jKqO4xyMXqOJhKNVdfYCwohtHEj1q255";

const CreateCardForm = ({ onCreate, onClose }) => {
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [gifSearch, setGifSearch] = useState("");
  const [gifResults, setGifResults] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);

  const handleGifSearch = async () => {
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${gifSearch}&limit=5`
    );
    const json = await res.json();
    setGifResults(json.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message || !selectedGif) return alert("Message and GIF are required");

    const newCard = {
      id: Date.now(),
      message,
      author: author || "Anonymous",
      gifUrl: selectedGif,
      upvotes: 0,
    };

    onCreate(newCard);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="create-card-modal">
        <form className="card-form" onSubmit={handleSubmit}>
          <input
            className="form-input"
            placeholder="Message (required)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <input
            className="form-input"
            placeholder="Author (optional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <div className="gif-search-group">
            <input
              className="form-input"
              placeholder="Search GIFs"
              value={gifSearch}
              onChange={(e) => setGifSearch(e.target.value)}
            />
            <button
              type="button"
              className="search-button"
              onClick={handleGifSearch}
            >
              Search
            </button>
          </div>

          <div className="gif-results">
            {gifResults.map((gif) => (
              <img
                key={gif.id}
                src={gif.images.fixed_height_small.url}
                alt="gif"
                className={`gif-thumb ${
                  selectedGif === gif.images.fixed_height_small.url
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedGif(gif.images.fixed_height_small.url)
                }
              />
            ))}
          </div>

          <div className="button-row">
            <button type="submit" className="submit-button">
              Add
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCardForm;
