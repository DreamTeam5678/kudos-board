import React from 'react';
import "./BoardCard.css";
import { Link } from 'react-router-dom';
import tack from '../../assets/tack.png';

function BoardCard({ board, onDelete }) {

    const pastels = [
        "#AEC6CF", "#F7C6C7", "#77DD77", "#FFFACD", "#FFD1DC",
        "#B0E0E6", "#FFCBC1", "#FFDAB9", "#E6E6FA", "#D4F1F4",
        "#F5E1FF", "#FFE4E1", "#E0FFFF", "#F0FFF0", "#FAFAD2",
        "#C1E1C1", "#FFDEAD", "#F4C2C2", "#EADDDD", "#E3F6F5",
        "#FFF0F5", "#FFEFD5", "#D8BFD8", "#FFB6C1", "#BFD8B8",
        "#FAD6BF", "#F6D6AD", "#E0BBE4", "#FFDAC1", "#E4F9F5",
        "#FBE7C6", "#D1C4E9", "#C7CEEA", "#D5E8D4", "#FFE0F0",
        "#FDFD96", "#B4E7B6", "#F7F2E7", "#EAE2B7", "#FAF3DD",
        "#E1F7D5", "#FFEBE0", "#E2F0CB", "#FFECF5", "#D0F0FD",
        "#F6E2B3", "#FAD9C1", "#E8EAF6", "#F9F1F0", "#FCE1E4"
    ];

    function getRandomPastel() {
        return pastels[Math.floor(Math.random() * pastels.length)];
    }

    function randomTilt(){
        const tilts = [-3, -2, -1, 0, 1, 2, 3];
        return `rotate(${tilts[Math.floor(Math.random() * tilts.length)]}deg)`;
    }


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
        <div className="board-card" style={{
            backgroundColor: getRandomPastel(),
            transform: randomTilt(),
        }}>

            <div className="board-card-image" style={{
                backgroundImage: `url(${tack})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "6px",
            }}> </div>
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