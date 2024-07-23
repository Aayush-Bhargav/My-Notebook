import React from 'react'
import { useContext, useEffect, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import EditNote from './EditNote';
import { useNavigate } from 'react-router-dom';
import "../App.css"
//component to display all notes of a user
export default function Notes() {
    let history = useNavigate();
    const { fetchNotes, notes, display, editNote, addNote } = useContext(noteContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (localStorage.getItem('token'))
                    await fetchNotes(); // Ensure fetchNotes updates contextValue.notes
                else
                    history("/login")
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };


        fetchData(); // Fetch data initially when notes are empty

    }, [display]); // Depend on fetchNotes to re-run effect when it changes

    return (
        <div className='container my-3'>
            {display ? (<AddNote />) : (<EditNote />)}
            {/* Depending on the value of display, show AddNote or EditNote*/}

            {notes.length>0?<h2 className='my-3 mt-5'>Your Notes</h2>:<h2 className='my-3 mt-5'>No Notes Added Yet.</h2>}

            {/* <div className='notes-container'> */}
            <div className='row my-3'>
                {notes.map((note) => {
                    return (
                        <div key={note._id} className='col-lg-3 col-md-4 col-sm-12 my-3'><Noteitem note={note} /></div>)
                })}
            </div>
            {/* </div> */}

        </div>
    )
}
