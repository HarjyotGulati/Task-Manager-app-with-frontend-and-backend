import Note from "../model/Note.js"

export async function getAllNotes(_,res){
    try{
        const notes = await Note.find().sort({ createdAt: -1 }); // -1 will sort in desc. order (newest first)
        res.status(200).json(notes);
    }catch(error){
        console.error("Error in getAllNotes controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function getNoteById(req,res){
    try{
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Note not found"})
        res.status(200).json({note});
    }  
    catch(error){
        console.error("Error in getNoteById controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function createNote(req,res){
    try{
        const {title,content} = req.body
        const newNote = new Note({title,content});
        const savedNote =  await newNote.save();
        res.status(201).json({message:"New Note created",savedNote});
    }
    catch(error){
        console.error("Error in createNote controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function updateNote(req,res){
    try{
        const {title,content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},
            {
                new:true,
            }
        );
        if(!updatedNote) return res.status(404).json({message:"Note not found."});
        res.status(200).json({message:"Note updated successfully",
            note:updatedNote
        });
    }
    catch(error){
        console.error("Error in updateNote controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function deleteNote(req,res){
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message:"Note not found."});
        res.status(200).json({message:"Note deleted  successfully"});
    }
    catch(error){
        console.error("Error in updateNote controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}