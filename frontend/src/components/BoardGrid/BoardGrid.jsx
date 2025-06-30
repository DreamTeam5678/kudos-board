import React from 'react';
import "./BoardGrid.css";
import { Link } from 'react-router-dom';
import BoardCard from '../BoardCard/BoardCard';


function BoardGrid(props) {
    return (

        <div className="board-grid">
            {props.boardData.map((board) => (
                <BoardCard 
                    key={board.id}
                    id={board.id}
                    title={board.title}
                    description={board.description}
                    image={board.image}
                />
            ))}
        </div>

        
    );
}

export default BoardGrid;
