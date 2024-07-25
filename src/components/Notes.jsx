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
    const { fetchNotes, notes, display, editNote, addNote ,user} = useContext(noteContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (localStorage.getItem('token'))
                    {
                        console.log('token is present')
                        const result=await fetchNotes(); // Ensure fetchNotes updates contextValue.notes
                        if(!result)
                            throw new Error('Invalid token')
                    }
                else
                    history("/login")
            } catch (error) {
                console.error('You need to login before trying to access notes.Error fetching notes:', error);
                history("/login");//Redirect to the login page
            }
        };


        fetchData(); // Fetch data initially when notes are empty

    }, [display]); // Depend on fetchNotes to re-run effect when it changes

    return (
        <div className='container my-3'>
            {display ? (<AddNote />) : (<EditNote />)}
            {/* Depending on the value of display, show AddNote or EditNote*/}

            {notes.length>0?<h2 className='my-3 mt-5'>Welcome {user}! Your Notes</h2>:<h2 className='my-3 mt-5'>No Notes Added Yet.</h2>}

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
