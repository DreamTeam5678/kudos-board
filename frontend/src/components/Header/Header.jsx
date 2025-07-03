import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import logo from "/src/assets/logo2.png";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Header.css";

const categories = [
  { label: "All", value: "all" },
  { label: "Celebration", value: "celebration" },
  { label: "Thank You", value: "thank-you" },
  { label: "Inspiration", value: "inspiration" },
  { label: "Recent", value: "recent" },
];

const Header = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onCreateClick,
}) => {
  const handleClear = () => setSearchQuery("");

  return (
    <header className="header">
      <img src={logo} alt="logo" className="logo" />

      <div className="search-bar-wrapper">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="search" onClick={() => setSearchQuery(searchQuery)}>
          Search
        </button>
        {searchQuery && (
          <button className="clear-button" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>

      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`category-button ${selectedCategory === cat.value ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="create-board">
        <button className="create-board-button" onClick={onCreateClick}>
          + Pin to Board ✎ᝰ...
        </button>
      </div>

      <div className="theme-toggle-wrapper">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
