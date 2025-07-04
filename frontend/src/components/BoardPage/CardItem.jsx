/*
import React from "react";
import "./BoardPage.css"; 
import pin from "../../assets/pin.png";
import trash from "../../assets/trash.png";
import CommentModal from "./CommentModal";

const pastels = [
  "#AEC6CF", "#F7C6C7", "#FFD1DC", "#B0E0E6", "#FFCBC1",
  "#FFDAB9", "#E6E6FA", "#D4F1F4", "#F5E1FF", "#FFE4E1",
  "#E0FFFF", "#F0FFF0", "#C1E1C1", "#EADDDD", "#E3F6F5",
  "#FFF0F5", "#FFEFD5", "#D8BFD8", "#FFB6C1", "#BFD8B8",
  "#FAD6BF", "#F6D6AD", "#E0BBE4", "#FFDAC1", "#E4F9F5",
  "#FBE7C6", "#D1C4E9", "#C7CEEA", "#D5E8D4", "#FFE0F0"
];
const [showComments, setShowComments] = useState(false);
function getRandomPastel() {
  return pastels[Math.floor(Math.random() * pastels.length)];
}

function randomTilt() {
  const tilts = [-3, -2, -1, 0, 1, 2, 3];
  return `rotate(${tilts[Math.floor(Math.random() * tilts.length)]}deg)`;
}

const CardItem = ({ card, onDelete, onUpvote }) => {
  if (!card) {
    console.warn("CardItem received an undefined or null card prop.");
    return null;
  }

  return (
    <div
      className="board-card" 
      style={{
        backgroundColor: getRandomPastel(),
        transform: randomTilt(),
      }}
    >
      <div className="tack">
        <img src={pin} alt="pin" />
      </div>

      <div className="board-card-image">
        <img className="im" src={card.gifUrl || ''} alt="GIF" />
      </div>

      <div className="board-card-content">
        <div className="desc"> 
          <p className="board-card-title">{card.message || 'No Message'}</p>
          <p className="board-card-description">Author: {card.author || 'Unknown'}</p>
        </div>

        <div className="board-card-actions">
          <button className="board-card-button" onClick={() => onUpvote(card.id)}>
            <div className="heart-container">
                <span className="heart-icon">♡</span>
                <span className="upvote-count">{card.upvotes || 0}</span>
            </div>
          </button>
          <button className="board-card-button" onClick={() => onDelete(card.id)}>
            <img src={trash} alt="delete" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
*/
import React, { useState } from "react";
import "./BoardPage.css"; 
import pin from "../../assets/pin.png";
import trash from "../../assets/trash.png";
import CommentModal from "./CommentModal";

const pastels = [
  "#AEC6CF", "#F7C6C7", "#FFD1DC", "#B0E0E6", "#FFCBC1",
  "#FFDAB9", "#E6E6FA", "#D4F1F4", "#F5E1FF", "#FFE4E1",
  "#E0FFFF", "#F0FFF0", "#C1E1C1", "#EADDDD", "#E3F6F5",
  "#FFF0F5", "#FFEFD5", "#D8BFD8", "#FFB6C1", "#BFD8B8",
  "#FAD6BF", "#F6D6AD", "#E0BBE4", "#FFDAC1", "#E4F9F5",
  "#FBE7C6", "#D1C4E9", "#C7CEEA", "#D5E8D4", "#FFE0F0"
];

function getRandomPastel() {
  return pastels[Math.floor(Math.random() * pastels.length)];
}

function randomTilt() {
  const tilts = [-3, -2, -1, 0, 1, 2, 3];
  return `rotate(${tilts[Math.floor(Math.random() * tilts.length)]}deg)`;
}

const CardItem = ({ card, onDelete, onUpvote }) => {
  const [showComments, setShowComments] = useState(false);

  if (!card) {
    console.warn("CardItem received an undefined or null card prop.");
    return null;
  }

  return (
    <>
      <div
        className="board-card" 
        style={{
          backgroundColor: getRandomPastel(),
          transform: randomTilt(),
        }}
      >
        <div className="tack">
          <img src={pin} alt="pin" />
        </div>

        <div className="board-card-image">
          <img className="im" src={card.gifUrl || ''} alt="GIF" />
        </div>

        <div className="board-card-content">
          <div className="desc"> 
            <p className="board-card-title">{card.message || 'No Message'}</p>
            <p className="board-card-description">Author: {card.author || 'Unknown'}</p>
          </div>

          <div className="board-card-actions">
            <button className="board-card-button" onClick={() => onUpvote(card.id)}>
              <div className="heart-container">
                  <span className="heart-icon">♡</span>
                  <span className="upvote-count">{card.upvotes || 0}</span>
              </div>
            </button>
            <button className="board-card-button" onClick={() => setShowComments(true)}>
              💬
            </button>
            <button className="board-card-button" onClick={() => onDelete(card.id)}>
              <img src={trash} alt="delete" />
            </button>
          </div>
        </div>
      </div>

      {showComments && (
        <CommentModal
          card={card}
          onClose={() => setShowComments(false)}
        />
      )}
    </>
  );
};

export default CardItem;
