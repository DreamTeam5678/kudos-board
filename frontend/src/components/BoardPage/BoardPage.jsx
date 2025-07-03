import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

 
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
    <button className="back-button" onClick={() => navigate("/")}>
        ← Back to Main Page
    </button>
    
    <h1>{board?.title || "Board Page"}</h1>

    <button className="create-button" onClick={() => setShowModal(true)}>
      +  Pin to Card ✎ᝰ...
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

