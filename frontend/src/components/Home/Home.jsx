import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import BoardGrid from "../BoardGrid/BoardGrid";
import BoardCard from "../BoardCard/BoardCard";
import axios from "axios";
import "./Home.css";
import CreateBoardForm from "../CreateBoardForm/CreateBoardForm";

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [filteredBoards, setFilteredBoards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showForm, setShowForm] = useState(false);

  // Initial fetch
  const fetchBoards = async () => {
    try {
      const res = await axios.get("http://localhost:3000/boards");
      setBoards(res.data);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  // Polling every 5 seconds for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchBoards();
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  // Filtering logic
  useEffect(() => {
    const filtered = Array.isArray(boards)
      ? boards.filter((board) => {
          const matchCategory =
            selectedCategory === "all" || board.category === selectedCategory;
          const matchSearch = board.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          return matchCategory && matchSearch;
        })
      : [];
    setFilteredBoards(filtered);
  }, [boards, selectedCategory, searchQuery]);

  // Handle new board creation locally
  const handleCreateBoard = (newBoard) => {
    setBoards((prevBoards) => [...prevBoards, newBoard]);
    setShowForm(false);
  };

  return (
    <div className="home">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onCreateClick={() => setShowForm(true)}
      />
      <BoardGrid boards={filteredBoards} />
      {showForm && (
        <CreateBoardForm
          onClose={() => setShowForm(false)}
          onCreate={handleCreateBoard}
        />
      )}
    </div>
  );
};

export default Home;
