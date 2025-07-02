import React from "react";
import "../BoardCard/BoardCard.css";

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

function randomTilt() {
  const tilts = [-3, -2, -1, 0, 1, 2, 3];
  return `rotate(${tilts[Math.floor(Math.random() * tilts.length)]}deg)`;
}

const CardItem = ({ card, onDelete, onUpvote }) => {
  return (
    <div
      className="board-card"
      style={{
        backgroundColor: getRandomPastel(),
        transform: randomTilt(),
      }}
    >
      <div className="board-card-image">
        <img src={card.gifUrl} alt="GIF" />
      </div>
      <div className="board-card-content">
        <p className="board-card-title">{card.message}</p>
        <p className="board-card-description">
          <strong>Author:</strong> {card.author}
        </p>
        <p>👍 {card.upvotes}</p>
        <div className="board-card-actions">
          <button className="board-card-button" onClick={() => onUpvote(card.id)}>
            Upvote
          </button>
          <button className="board-card-button" onClick={() => onDelete(card.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
