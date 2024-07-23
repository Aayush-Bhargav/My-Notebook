import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import { Fab } from "@mui/material";
export default function EditNote(props) {
    const context = useContext(noteContext);
    const { editNote, handleDisplay, displayAlert } = context;
    const Note = context.note;
    const [note, setNote] = useState({ title: Note.title, description: Note.description, tag: Note.tag });//note is an object that contains details about the note, i.e its title and description

    const rowCount = 3;

    const handleChange = (event) => {//function to handle any change in input both in the input element as well as the textarea
        const { name, value } = event.target;
        setNote((prevNote) => {
            return { ...prevNote, [name]: value };
        });
    }
    const handleSubmit = (event) => {//to prevent default action that takes place when a form is submitted
        event.preventDefault();
    }
    return (
        <div>

            <form className="create-note" onSubmit={handleSubmit}>
                <h4>Edit Note</h4>
                <input name="title" placeholder="Title" value={note.title} onChange={handleChange} minLength={3} required />
                <input name="tag" placeholder="Tag" value={note.tag} onChange={handleChange} />
                <textarea name="description" placeholder="Take a note..." rows={rowCount} value={note.description} onChange={handleChange} minLength={3} required />
                <div className="form-div">
                    {/* <Fab type="submit" color="warning" onClick={() => {
                        editNote(Note._id, note.title, note.description, note.tag);//means user wants to edit that note.
                        handleDisplay();
                    }}><DoneIcon /></Fab>
                    <Fab color="warning" onClick={() => {//means you want to revert the note to its old state
                        handleDisplay();
                    }}><CancelIcon /></Fab> */}
                    <button type="submit" disabled={note.title.length < 3 || note.description.length < 3} onClick={() => {
                        handleDisplay();
                        editNote(Note._id, note.title, note.description, note.tag);//means user wants to edit that note.
                        displayAlert('Note successfully updated!', 'success');

                    }}><DoneIcon /></button>

                    <button onClick={() => {//means you want to revert the note to its old state
                        handleDisplay();
                        displayAlert('Note reverted back to its original state!', 'warning');

                    }}><CancelIcon /></button>
                </div>
            </form>
        </div>
    )
}
