import React from 'react';
import "./BoardGrid.css";
import { Link } from 'react-router-dom';
import BoardCard from '../BoardCard/BoardCard';


function BoardGrid({boards = []}) {
    return (

        <div className="board-grid">
            {boards.map((board) => (
                <BoardCard 
                    key={board.id}  
                    board={board}
                />
            ))}
        </div>


    );
}

export default BoardGrid;
