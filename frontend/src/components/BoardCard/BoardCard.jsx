import React from 'react';
import "./BoardCard.css";
import { Link } from 'react-router-dom';

function BoardCard({ board, onDelete }) {


    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this board?")) {
            fetch(`http://localhost:3000/boards/${board.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("Deleted board:", data);
                    onDelete(board.id);
                })
                .catch((error) => {
                    console.error("Error deleting board:", error);
                });
        }
    };

    return (
        <div className="board-card">
            <div className="board-card-image">
                <img src={board.image} alt={board.title} />
            </div>
            <div className="board-card-content">
                <p className = "board-card-title">{board.title}</p>
                <p className = "board-card-description">{board.description}</p>
                <div className="board-card-actions">
                    <button className="board-card-button">
                        <Link to={`/board/${board.id}`}>View Board</Link>
                    </button>
                    <button className="board-card-button"onClick = {() => handleDelete()}>Delete Board </button>
                </div>
            </div>
        </div>
    );
}

export default BoardCard;