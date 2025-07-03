/*
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./BoardPage.css";

const GIPHY_API_KEY = "jKqO4xyMXqOJhKNVdfYCwohtHEj1q255";

const BoardPage = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [gifSearch, setGifSearch] = useState("");
  const [gifResults, setGifResults] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await fetch(`http://localhost:3000/boards/${id}`);
        const json = await res.json();
        setBoard(json);
        setCards(json.cards || []);
      } catch (error) {
        console.error("Error fetching board:", error);
      }
    };
    fetchBoard();
  }, [id]);

  const handleUpvote = async (cardId) => {
    try {
      const res = await fetch(`http://localhost:3000/boards/${id}/cards/${cardId}/upvote`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to upvote");
      const updated = cards.map((card) =>
        card.id === cardId ? { ...card, upvotes: card.upvotes + 1 } : card
      );
      setCards(updated);
    } catch (error) {
      console.error("Upvote error:", error);
    }
  };

  const handleDelete = async (cardId) => {
    try {
      const res = await fetch(`http://localhost:3000/boards/${id}/cards/${cardId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete card");
      setCards((prev) => prev.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleGifSearch = async () => {
    if (!gifSearch) return;
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${gifSearch}&limit=5`
      );
      const json = await res.json();
      setGifResults(json.data);
    } catch (error) {
      console.error("GIF search failed:", error);
    }
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    if (!message || !selectedGif) return alert("Message and GIF required");

    const newCardData = {
      message,
      author: author || "Anonymous",
      gifUrl: selectedGif,
      upvotes: 0,
    };

    try {
      const res = await fetch(`http://localhost:3000/boards/${id}/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCardData),
      });
      if (!res.ok) throw new Error("Failed to create card");
      const data = await res.json();
      setCards((prev) => [data, ...prev]);
      setMessage("");
      setAuthor("");
      setGifSearch("");
      setGifResults([]);
      setSelectedGif(null);
    } catch (error) {
      console.error("Card creation failed:", error);
    }
  };

  return (
    <div className="board-page">
      <h1>{board?.title || "Board Page"}</h1>

      <form onSubmit={handleAddCard} className="card-form">
        <h3 className="form-title">Add a New Card</h3>
        <input
          type="text"
          placeholder="Message (required)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="text"
          placeholder="Author (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="form-input"
        />
        <div className="gif-search-group">
          <input
            type="text"
            placeholder="Search GIFs"
            value={gifSearch}
            onChange={(e) => setGifSearch(e.target.value)}
            className="form-input"
          />
          <button type="button" onClick={handleGifSearch} className="search-button">
            Search
          </button>
        </div>
        <div className="gif-results">
          {gifResults.map((gif) => (
            <img
              key={gif.id}
              src={gif.images.fixed_height_small.url}
              alt="gif"
              className={`gif-thumb ${selectedGif === gif.images.fixed_height_small.url ? "selected" : ""}`}
              onClick={() => setSelectedGif(gif.images.fixed_height_small.url)}
            />
          ))}
        </div>
        <div className="button-row">
          <button type="submit" className="submit-button">Add Card</button>
        </div>
      </form>

      <div className="card-grid">
        {cards.map((card) => (
          <div key={card.id} className="card">
            <h3>{card.message}</h3>
            <img src={card.gifUrl} alt="GIF" className="gif-display" />
            <p><strong>Author:</strong> {card.author}</p>
            <p>👍 {card.upvotes}</p>
            <button onClick={() => handleUpvote(card.id)}>Upvote</button>
            <button onClick={() => handleDelete(card.id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
*/
import { useParams } from "react-router-dom";
import React, { useState, useEffect} from "react";
import CreateCardForm from "./CreateCardForm";
import "./BoardPage.css";
import CardItem from "./CardItem";
const GIPHY_API_KEY = "jKqO4xyMXqOJhKNVdfYCwohtHEj1q255";

const BoardPage = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
 
  const fetchBoard = async () => {
    try {
      const res = await fetch(`http://localhost:3000/boards/${id}`);
      const json = await res.json();
      setBoard(json);
      setCards(json.cards || []);
    } catch (error) {
        console.error("Error fetching board:", error);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [id]);

  useEffect(() => {
      const interval = setInterval(() => {
        fetchBoard();
      }, 5000); // 5 seconds
  
      return () => clearInterval(interval); // Clean up on unmount
    }, []);

  const handleUpvote = async (cardId) => {
    try {
      const res = await fetch(`http://localhost:3000/boards/${id}/cards/${cardId}/upvote`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to upvote");
      const updated = cards.map((card) =>
        card.id === cardId ? { ...card, upvotes: card.upvotes + 1 } : card
      );
      setCards(updated);
    } catch (error) {
      console.error("Upvote error:", error);
    }
  };

  const handleDelete = async (cardId) => {
    try {
      const res = await fetch(`http://localhost:3000/boards/${id}/cards/${cardId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete card");
      setCards((prev) => prev.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleCreate = async (newCard) => {
    try {
      const res = await fetch(`http://localhost:3000/boards/${id}/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      });
      if (!res.ok) throw new Error("Failed to create card");
      const data = await res.json();
      setCards((prev) => [data, ...prev]);
    } catch (error) {
      console.error("Card creation failed:", error);
    }
  };

  return (
  <div className="board-page">
    <h1>{board?.title || "Board Page"}</h1>

    <button className="create-button" onClick={() => setShowModal(true)}>
      + Create New Card
    </button>

    {showModal && (
      <CreateCardForm
        onCreate={handleCreate}
        onClose={() => setShowModal(false)}
      />
    )}

    <div className="card-grid">
      {cards.map((card) => (
        <CardItem
          key={card.id}
          card={card}
          onDelete={handleDelete}
          onUpvote={handleUpvote}
        />
      ))}
    </div>
  </div> 
  );

};
export default BoardPage;

