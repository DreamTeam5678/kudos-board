import React from "react";
import "./Header.css";

const Header = ({searchQuery, setSearchQuery, selectedCategory, setSelectedCategory}) => {
    const handleSearchChange = (event) => setSearchQuery(event.target.value);
    const handleCategoryChange = (event) => setSelectedCategory(event.target.value);


    return(
        <header className = "header">
            <div class name = "logo">
                Kudos Board
            </div>
            <div className = "filters">
                <select value = {selectedCategory} onChange = {handleCategoryChange}>
                    <option value = "all">All</option>
                    <option value = "good">Good</option>
                    <option value = "bad">Bad</option>
                    <option value = "ugly">Ugly</option>
                    <option value = "ok">Ok</option>
                </select>
            </div>
            <div className = "search">
                <input type = "text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                />
            </div>
        </header>
    );
}

export default Header;