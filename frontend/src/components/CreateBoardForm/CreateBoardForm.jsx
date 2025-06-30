import React, { useState } from "react";
import "./CreateBoardForm.css";

const CreateBoardForm = ({ onCreate, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "celebration",
    image: "",
    author: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.image || !formData.category) return;
    const newBoard = { ...formData, id: Date.now() };
    onCreate(newBoard);
  };

  return (
    <div className="create-board-modal">
      <form onSubmit={handleSubmit} className="create-board-form">
        <h2>Create New Board</h2>
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="celebration">Celebration</option>
          <option value="thank-you">Thank You</option>
          <option value="inspiration">Inspiration</option>
          <option value="recent">Recent</option>
        </select>
        <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
        <input name="author" placeholder="Author (optional)" value={formData.author} onChange={handleChange} />
        <div className="button-row">
          <button type="submit">Create</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateBoardForm;
