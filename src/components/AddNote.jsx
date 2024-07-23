import React, { useContext, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Zoom } from '@mui/material';
import Fab from '@mui/material/Fab';
import noteContext from "../context/notes/noteContext";
export default function AddNote(props) {
    const context = useContext(noteContext);
    const { addNote, displayAlert } = context;
    const [note, setNote] = useState({ title: '', content: '', tag: '' });//note is an object that contains details about the note, i.e its title and content
    const [expand, setExpand] = useState(false);
    const rowCount = 3;
    const handleClick = () => {
        setExpand(true);

    }
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
                <input name="title" placeholder={expand ? "Title" : "Take a note..."} value={note.title} onChange={handleChange} onClick={handleClick} required
                    minLength={3}
                />
                {expand && <input name="tag" placeholder="Tag" value={note.tag} onChange={handleChange} />}
                {expand && <textarea name="content" placeholder="Take a note..." rows={rowCount} value={note.content} onChange={handleChange} required minLength={3} />}
                <div className="form-div">
                    {expand && <button disabled={note.title.length < 3 || note.content.length < 3} type="submit" onClick={() => {
                        console.log(note);
                        addNote(note.title, note.content, note.tag)//call the function to add a note with the said details
                        displayAlert('Note successfully added!','success');
                        setNote(() => {//reset the note to contain nothing
                            return {
                                title: '',
                                content: '',
                                tag: ''
                            }
                        });
                        //make sure the input becomes similar to how it was before the click
                        // Delay setting expand to false to allow animation
                        setTimeout(() => {
                            setExpand(false);

                        }, 30); // Adjust the delay time as needed (milliseconds)
                    }}><AddIcon /></button>}
                </div>
            </form>
        </div>
    )
}
