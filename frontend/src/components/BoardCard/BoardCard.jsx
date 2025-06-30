import React from 'react';
import "./BoardCard.css";
import { Link } from 'react-router-dom';

function BoardCard({ board }) {
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
                    <button className="board-card-button">
                        <Link to={`/board/${board.id}/edit`}>Delete Board</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BoardCard;