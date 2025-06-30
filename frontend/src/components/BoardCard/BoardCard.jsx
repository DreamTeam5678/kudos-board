import React from 'react';
import "./BoardCard.css";
import { Link } from 'react-router-dom';

function BoardCard(props) {
    return (
        <div className="board-card">
            <div className="board-card-image">
                <img src={props.image} alt={props.title} />
            </div>
            <div className="board-card-content">
                <h3>{props.title}</h3>
                <p>{props.description}</p>
                <div className="board-card-actions">
                    <button className="board-card-button">
                        <Link to={`/board/${props.id}`}>View Board</Link>
                    </button>
                    <button className="board-card-button">
                        <Link to={`/board/${props.id}/edit`}>Delete Board</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BoardCard;