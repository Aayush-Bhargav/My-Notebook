import express from 'express';
import connectToMongoDB from './database.js';
import authRouter from './routes/auth.js';
import notesRouter from './routes/notes.js';
import cors from 'cors'; // Import cors module
connectToMongoDB();
const app=express();
const PORT=5000;
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/notes",notesRouter);

app.get("/",(req,res)=>{
    res.send('Hi!');
})
app.listen(PORT,()=>{
    console.log(`Server set up on port ${PORT}`);
})