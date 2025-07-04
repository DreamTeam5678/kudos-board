import React, { useEffect, useState } from "react";
import "./CommentModal.css";

const CommentModal = ({ card, onClose }) => {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (!card?.id) return;

    // ✅ Call your backend directly
    fetch(`http://localhost:3000/cards/${card.id}/comments`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch comments");
        return res.json();
      })
      .then(setComments)
      .catch((err) => console.error("Failed to fetch comments", err));
  }, [card.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const res = await fetch(`http://localhost:3000/cards/${card.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, author: author || "Anonymous" }),
      });

      if (!res.ok) throw new Error("Failed to add comment");

      const newComment = await res.json();
      setComments((prev) => [newComment, ...prev]);
      setMessage("");
      setAuthor("");
    } catch (err) {
      console.error("Error submitting comment", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{card.message}</h2>
        {card.gifUrl && <img src={card.gifUrl} alt="gif" className="comment-gif" />}
        <p><strong>Author:</strong> {card.author || "Anonymous"}</p>

        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            placeholder="Write a comment..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Your name (optional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button type="submit">Post Comment</button>
        </form>

        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <p>{comment.message}</p>
              <small>— {comment.author || "Anonymous"}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
