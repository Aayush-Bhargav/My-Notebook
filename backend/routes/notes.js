import express, { json } from 'express';
import fetchUser from '../middleware/fetchUser.js';
import Note from '../models/Notes.js';
import { body, validationResult } from 'express-validator';
const router = express.Router();

// Define routes
//ROUTE 1: To fetch all the notes of a user who is logged in. //Log in required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    console.log("Notes received at the backend is:" + (notes));
    return res.json(notes)
});

//ROUTE 2: To add a particular user's notes by a user who is logged in using POST. //Log in required
router.post('/addnote', fetchUser, [
    //middleware for inpu validation
    body('title').exists().withMessage('Please enter a non empty title.'),
    body('description').exists().withMessage('Enter a valid non empty description'),

], async (req, res) => {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) { //means some error occured so send the status code 400 along with the error
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        console.log(req.body);//just for us to see 
        //extract user id from the token and assign it to the note
        let user = req.user.id;
        // Create a new note with the details
        let note = new Note({ title: req.body.title, description: req.body.description, tag: req.body.tag, user: user });
        await note.save();
        return res.json(note);
    }
    catch (err) { //means error occured 
        console.log(err);
        return res.status(500).send('Internal server error.')
    }

});

//ROUTE 3: To update a particular user's particular note using PUT. //Log in required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        console.log(req.body);//just for us to see 
        const { title, description, tag } = req.body;
        const updatedNote = {};
        if (title)
            updatedNote.title = title;
        if (description)
            updatedNote.description = description;
        if (tag)
            updatedNote.tag = tag
        //extract user id from the token and assign it to the note
        let user = req.user.id;
        const { id } = req.params;
        // Find the note with that id
        let note = await Note.findById(id);
        //check if note with that id exists
        if (!note)
            return res.status(404).send('Note with that id does not exist');
        //verify if that note's user is the user who is trying to update the note
        if (note.user.toString() !== user)
            return res.status(401).send('Unauthorized  access!');

        let newNote = await Note.findByIdAndUpdate(
            id,
            { $set: updatedNote }, // Fields to update
            { new: true, runValidators: true } // Options: return the updated document, run validators
        );
        return res.json({ newNote });
    }
    catch (err) { //means error occured 
        console.log(err);
        return res.status(500).send('Internal server error.')
    }

});

//ROUTE 4: To delete a particular user's particular note using DELETE. //Log in required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        console.log(req.body);//just for us to see 

        //extract user id from the token and assign it to the note
        let user = req.user.id;
        const { id } = req.params;
        // Find the note with that id
        let note = await Note.findById(id);
        //check if note with that id exists
        if (!note)
            return res.status(404).send('Note with that id does not exist');
        //verify if that note's user is the user who is trying to delete the note
        if (note.user.toString() !== user)
            return res.status(401).send('Unauthorized  access!');
        //find the note by id and delete it!
        note = await Note.findByIdAndDelete(id);
        return res.json({ "Success": "Note successfully deleted!", note: note });
    }
    catch (err) { //means error occured 
        console.log(err);
        return res.status(500).send('Internal server error.')
    }

});

export default router;
