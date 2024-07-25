import React, { useState } from "react";
import NoteContext from "./noteContext.js";
import axios from "axios";
import { json } from "react-router-dom";
//note state component that implements all the functions and holds all the states and makes use of use context hook to avoid prop drilling
const NoteState = (props) => {
    const host = "http://localhost:5000";
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({});
    const [user, setUser] = useState('');
    const [display, setDisplay] = useState(true);
    const [alert, setAlert] = useState({
        msg: "",
        color: ''
    });
    const setTheUser=(user)=>{ //function to set the current user who is logged in
        setUser(user);
    }
    const [showAlert, setShowAlert] = useState(false);
    const displayAlert = (msg, color) => { //function to display a self dismissing alert
        setShowAlert(true);
        setAlert({
            msg: msg,
            color: color
        });
        setTimeout(() => {
            setShowAlert(false);
            setAlert({ msg: "", color: "" });
        }, 1500)
    }
    const handleDisplay = () => {
        setDisplay(!display);
    }
    const setTheNote = (id) => { //function to set the note
        // console.log(typeof(id));
        notes.forEach((note) => {
            // console.log("id of note:"+typeof(note._id));
            if (note._id === id) {
                setNote(note);
            }
        })
    }
    async function fetchNotes() {//function to fetch notes USING our backend api
        try {
            console.log('Hey i am here!');
            const response = await axios.get(`${host}/api/notes/fetchallnotes`, {
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });

            console.log("in fetch notes, response:" + response.status);
            const arr = response.data;
            // for (let i = 0; i < arr.length; i++)
            //     console.log(arr[i])
            console.log(arr)
            setNotes(arr);
            console.log(notes);
            return true;
        } catch (error) {
            console.error('Error posting data:', error);
            return false;
        }
    }
    async function addNoteToDatabase(title, description, tag) {//function to add a note USING our backend api
        try {
            const response = await axios.post(`${host}/api/notes/addnote`, { title, description, tag }, {
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });
            let arr = response.data;
            console.log("add note" + arr);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }
    //funtion to Add a Note
    const addNote = async (title, description, tag) => {
        if (tag === '') //if tag is not specified , then give the general tag
            tag = 'General'
        const note = {
            "_id": "668536fc54ba76e9f1c5d705",
            "title": title,
            "description": description,
            "tag": tag,
            "user": "6683b90f08665470421c029f",
            "date": "2024-07-03T11:33:16.799Z",
            "__v": 0
        }
        console.log({ title, description, tag });
        await addNoteToDatabase(title, description, tag);
        const newNotes = [...notes];
        newNotes.push(note);
        setNotes(newNotes);
    }
    async function deleteNoteFromDatabase(id) {//function to add a note USING our backend api
        try {
            const response = await axios.delete(`${host}/api/notes/deletenote/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });
            let arr = response.data;
            console.log("add note" + arr);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    //function to Delete a Note
    const deleteNote = async (id) => {
        let newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        await deleteNoteFromDatabase(id);
        setNotes(newNotes);
    }
    async function editNoteInDatabase(id, title, description, tag) {//function to edit a note USING our backend api
        try {
            const response = await axios.put(`${host}/api/notes/updatenote/${id}`, { title, description, tag }, {
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }
    //function to Edit a Note
    const editNote = async (id, title, description, tag) => {
        console.log("In edit" + id + " " + title + " " + description + " " + tag)
        await editNoteInDatabase(id, title, description, tag);

        notes.forEach((note) => { //iterate through all the notes
            if (note._id === id) {//find the note that matches and update its contents
                note.title = title;
                note.description = description;
                note.tag = tag;
            }
        });
        setNotes(notes);
    }
    return (
        <NoteContext.Provider value={{ notes: notes, fetchNotes, setNotes, addNote, deleteNote, editNote, setTheNote,setTheUser, note: note, handleDisplay, display: display, alert, showAlert, user,displayAlert }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
