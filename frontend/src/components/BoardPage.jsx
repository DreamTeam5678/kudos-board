// src/components/BoardPage.jsx

import React, { useState } from "react";

const GIPHY_API_KEY = "jKqO4xyMXqOJhKNVdfYCwohtHEj1q255"; // my key  from https://developers.giphy.com/dashboard/// Public beta key

const BoardPage = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      message: "You rock!",
      gifUrl: "https://media.giphy.com/media/l0MYGb1LuZ3n7dRnO/giphy.gif",
      upvotes: 3,
      author: "Lauritz",
    },
    {
      id: 2,
      message: "Great job!",
      gifUrl: "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif",
      upvotes: 5,
      author: "Team Bot",
    },
  ]);

  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [gifSearch, setGifSearch] = useState("");
  const [gifResults, setGifResults] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);

  const handleUpvote = (cardId) => {
    const updated = cards.map((card) =>
      card.id === cardId ? { ...card, upvotes: card.upvotes + 1 } : card
    );
    setCards(updated);
  };

  const handleDelete = (cardId) => {
    const updated = cards.filter((card) => card.id !== cardId);
    setCards(updated);
  };

  const handleGifSearch = async () => {
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${gifSearch}&limit=5`
    );
    const json = await res.json();
    setGifResults(json.data);
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!message || !selectedGif) return alert("Message and GIF required");

    const newCard = {
      id: Date.now(), // simple unique ID
      message,
      author: author || "Anonymous",
      gifUrl: selectedGif,
      upvotes: 0,
    };

    setCards([newCard, ...cards]);
    setMessage("");
    setAuthor("");
    setGifSearch("");
    setGifResults([]);
    setSelectedGif(null);
  };

  return (
    <div>
      <h1>Board Page</h1>

      {/* === Add New Card Form === */}
      <form onSubmit={handleAddCard} style={{ marginBottom: "2rem" }}>
        <h3>Add a New Card</h3>
        <input
          type="text"
          placeholder="Message (required)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
        />
        <input
          type="text"
          placeholder="Author (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
        />
        <input
          type="text"
          placeholder="Search GIFs"
          value={gifSearch}
          onChange={(e) => setGifSearch(e.target.value)}
          style={{ display: "inline-block", marginRight: "0.5rem" }}
        />
        <button type="button" onClick={handleGifSearch}>
          Search
        </button>

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginTop: "1rem",
            flexWrap: "wrap",
          }}
        >
          {gifResults.map((gif) => (
            <img
              key={gif.id}
              src={gif.images.fixed_height_small.url}
              alt="gif"
              style={{
                border:
                  gif.images.fixed_height_small.url === selectedGif
                    ? "3px solid blue"
                    : "1px solid gray",
                borderRadius: "6px",
                cursor: "pointer",
                width: "100px",
              }}
              onClick={() => setSelectedGif(gif.images.fixed_height_small.url)}
            />
          ))}
        </div>

        <button type="submit" style={{ marginTop: "1rem" }}>
          Add Card
        </button>
      </form>

      {/* === Card Grid === */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{card.message}</h3>
            <img
              src={card.gifUrl}
              alt="GIF"
              style={{ width: "100%", borderRadius: "6px" }}
            />
            <p>
              <strong>Author:</strong> {card.author}
            </p>
            <p>👍 {card.upvotes}</p>
            <button onClick={() => handleUpvote(card.id)}>Upvote</button>
            <button
              onClick={() => handleDelete(card.id)}
              style={{ marginLeft: "0.5rem", color: "red" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
