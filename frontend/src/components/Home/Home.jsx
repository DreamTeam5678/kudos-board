import React,{ useState, useEffect } from "react";
import Header from "../Header/Header";
import BoardGrid from "../BoardGrid/BoardGrid";
import BoardCard from "../BoardCard/BoardCard";
import axios from "axios";
import "./Home.css";

const Home = () => {
    const [boards, setBoards] = useState([]);
    const [filteredBoards, setFilteredBoards] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    /*
    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const res = await axios.get("/home");
                setBoards(res.data);
            } catch (error) {
                console.error("Error fetching boards:", error);
            }
        };
        fetchBoards();
    }, []);
    */
    
    useEffect(() => {
        const filtered = boards.filter((board) => {
            const matchCategory = selectedCategory === "all" || board.category === selectedCategory;
            const matchSearch = board.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchCategory && matchSearch;
        });
        setFilteredBoards(filtered);
    }, [boards, selectedCategory, searchQuery]);
    
   useEffect(() => {
    const dummyBoards = [
        {
        id: 1,
        title: "Team 9",
        description: "Great launch!",
        category: "celebration",
        image: "https://media.istockphoto.com/id/1178741587/photo/celebration-toast-with-champagne.jpg?s=612x612&w=0&k=20&c=7DDPWcPB29jTBr49-48-xMMHYb5yugVhKxzSbrRGV3s="
        },
        {
        id: 2,
        title: "Pamela!",
        description: "That header was 🔥",
        category: "thank-you",
        image: "https://via.placeholder.com/150"
        }
    ];
    setBoards(dummyBoards);
    }, []);

    return (
            <div className="home">
                <Header
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <BoardGrid boardData={filteredBoards} />
            </div>
    );
};

export default Home;
