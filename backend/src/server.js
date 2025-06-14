import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import rateLimiter from "./middlewear/rateLimiter.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(rateLimiter);
app.use('/api/notes',notesRoutes);


connectDB().then(()=>{
    app.listen(port,()=>{
    console.log(`server is now listening at port:${port}`);
})
});



