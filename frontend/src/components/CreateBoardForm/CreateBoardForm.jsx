import React, { useState } from "react";
import "./CreateBoardForm.css";

const CreateBoardForm = ({ onCreate, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "celebration",
    image: "",
    author: "",
  });

  const [imageResults, setImageResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageSearch, setImageSearch] = useState("");

  const UNSPLASH_ACCESS_KEY = "k2dngCCEUf7F7NF0uERLhlU3nSe2aB-FE3DcCMGaLE4";

  const handleImageSearch = async () => {
    if (!imageSearch) return;

    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${imageSearch}&per_page=9&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const data = await res.json(); // FIXED HERE
      const imageUrls = data.results.map((img) => ({
        id: img.id,
        url: img.urls.small,
        alt: img.alt_description || "Unsplash Image",
      }));
      setImageResults(imageUrls);
    } catch (error) {
      console.error("Error fetching image results:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.image || !formData.category) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      console.log("Submitting board:", formData);
      const res = await fetch("http://localhost:3000/boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorTxt = await res.text();
        console.error("Error creating board:", res.status, errorTxt);
        return;
      }

      const data = await res.json();
      onCreate(data);
      onClose();
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  return (
    <div className="create-board-modal">
      <form onSubmit={handleSubmit} className="create-board-form">
        <h2>Create New Board</h2>

        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="celebration">Celebration</option>
          <option value="thank-you">Thank You</option>
          <option value="inspiration">Inspiration</option>
        </select>

        <div className="image-search-group">
          <input
            placeholder="Search for board image"
            value={imageSearch}
            onChange={(e) => setImageSearch(e.target.value)}
          />
          <button type="button" onClick={handleImageSearch}>
            Search
          </button>
        </div>

        <div className="image-results">
          {imageResults.map((img) => (
            <img
              key={img.id}
              src={img.url}
              alt={img.alt}
              className={`image-option ${formData.image === img.url ? "selected" : ""}`}
              onClick={() => {
                setSelectedImage(img.url);
                setFormData((prev) => ({ ...prev, image: img.url }));
              }}
            />
          ))}
        </div>

        <input
          name="author"
          placeholder="Author (optional)"
          value={formData.author}
          onChange={handleChange}
        />

        <div className="button-row">
          <button type="submit">Create</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateBoardForm;
