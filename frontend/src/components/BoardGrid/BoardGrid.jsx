import React from 'react';
import "./BoardGrid.css";
import { Link } from 'react-router-dom';
import BoardCard from '../BoardCard/BoardCard';
import { useState, useEffect } from 'react';
import TrashCan from '../TrashCan/TrashCan';




function BoardGrid({boards = []}) {

    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        setBoardList(boards);
    }, [boards]);

    //handles deletion of board from board grid
    const handleDeleteBoard = (id) => {
        setBoardList(prev => prev.filter(board => board.id !== id));
        console.log(boards);
    };


    //handles deletion of board to trash can
    const handleDropFromTrash = (boardId) => {
        if (window.confirm("Are you sure you want to delete this board?")) {
            fetch(`http://localhost:3000/boards/${boardId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("Deleted board:", data);
                    setBoardList(prev => prev.filter(board => board.id !== boardId));
                })
                .catch((error) => {
                    console.error("Error deleting board:", error);
                });
        }
    };

    //handles drag and drop of board from trashcan
    const handleDragStart = (event, boardId) => {
        event.dataTransfer.setData('boardId', boardId);
    };  
    
    return (
        <div className="board-grid">
            <TrashCan onDelete={handleDeleteBoard} onDropBoard={handleDropFromTrash} />
            {boardList.map((board) => (
                <BoardCard 
                    key={board.id}  
                    board={board}
                    onDelete={handleDeleteBoard}
                    onDragStart={handleDragStart}
                />
            ))}
        </div>


    );
}

export default BoardGrid;
