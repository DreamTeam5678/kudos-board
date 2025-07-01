import React from 'react';
import "./BoardGrid.css";
import { Link } from 'react-router-dom';
import BoardCard from '../BoardCard/BoardCard';
import { useState, useEffect } from 'react';




function BoardGrid({boards = []}) {

    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        setBoardList(boards);
    }, [boards]);

    const handleDeleteBoard = (id) => {
        setBoardList(prev => prev.filter(board => board.id !== id));
        console.log(boards);
    };
    return (

        <div className="board-grid">
            {boardList.map((board) => (
                <BoardCard 
                    key={board.id}  
                    board={board}
                    onDelete={handleDeleteBoard}
                />
            ))}
        </div>


    );
}

export default BoardGrid;
