import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import dotenv from 'dotenv';
import connectDB from './config/db.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json())
app.use('/api/notes',notesRoutes);

connectDB();

app.get("/",(req,res)=>{
    res.send("hello");
})


app.listen(port,()=>{
    console.log(`server is now listening at port:${port}`);
})