import React, { useState, useContext } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../App.css';
import noteContext from '../context/notes/noteContext';
import EditNoteModal from './EditNote';
//note item component
export default function Noteitem(props) {
    const context = useContext(noteContext);
    const { deleteNote, setTheNote, handleDisplay, displayAlert } = context;

    const { note } = props;
    return (

        <div className="note card position-relative">
            <div style={{ display: "flex", justifyContent: "flex-end", position: "absolute", top: "0px", right: "0px" }}>
                <span className=" badge rounded-pill bg-danger" >
                    <span>{note.tag}</span>
                </span>
            </div>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <div className="note-buttons">
                <button onClick={() => {
                    setTheNote(note._id);
                   
                    handleDisplay();
                    // editNote(note._id);

                }}><EditIcon /></button>

                <button onClick={() => {
                    deleteNote(note._id);
                    displayAlert('Note successfully deleted!', 'success');

                }}><DeleteIcon /></button>
            </div>
        </div>

    );
}
