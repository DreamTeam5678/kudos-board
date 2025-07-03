import trash from '../../assets/trash.png';
import React from 'react';
import "./TrashCan.css";
import { useState } from 'react';

function TrashCan({ onDelete, onDropBoard }) {

    //used to toggle class when dragging over
    const [isDragOver, setIsDragOver] = useState(false);
    
    //allows dropping on element 
    const handleDrag = (event) => {
        event.preventDefault();
    };

    //sets class when dragging over and changes can styling
    const handleDragIn = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    //resets class when dragging out of element
    const handleDragOut = (event) => {
        event.preventDefault();
        setIsDragOver(false);
    };

    //removes class and uses board id to delete board
    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragOver(false);
        const boardId = event.dataTransfer.getData('boardId');
        onDropBoard(boardId);
    };

    return (
        <div 
        className={`trash-can ${isDragOver ? 'drag-over' : ''}`}
        onDragOver={handleDrag}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDrop={handleDrop}>
            <img src={trash} alt="trash" />
        </div>
    );

}

export default TrashCan;