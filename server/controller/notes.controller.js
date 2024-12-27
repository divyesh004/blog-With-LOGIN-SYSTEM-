const NotesModel = require("../model/notes.model")
const UserModel = require("../model/user.model")

const noteCreate=async(req,res)=>{
   
    const {title,body}=req.body

    if(!title || !body)
    {
        return res.status(400).json({error:"Please fill in all fields."})
    }

    try {
       
        await NotesModel.create({title,body,userId:req.user._id})
        return res.status(200).json({message:"Notes Created successfully"})
    } catch (error) {
        return res.status(400).json({error:error})
    }
}

const notesDelete=async(req,res)=>{
    const {notesId}=req.params

    const isExitNotes=await NotesModel.findById(notesId)
    if(!isExitNotes){
        return res.status(404).json({error:"Notes Not Found."})
    }
    // console.log(isExitNotes)
    if(isExitNotes.userId!=req.user._id){
        res.status(400).send({message:"You have not permissio to delete notes"})
    }

    await NotesModel.findByIdAndDelete(notesId)
    res.status(200).send({message:"Notes Deleted successfully"})
}

const getNotesByUser=async(req,res)=>{
    const {userId}=req.params

    if(userId != req.user._id){
        return res.status(400).json({error:"You have not permissio to get notes"})
    }

    try {
        const notes=await NotesModel.find({userId})
        if(!(notes.length) >0){
            return res.status(404).json({error:"Notes Not Found."})
        }
        return res.status(200).json({message:"notes get successfully", notes})
    } catch (error) {
        return res.status(400).json({message:error})
    }
}

const getSingleUserNotes=async(req,res)=>{
    const {notesId}=req.params

    try {
        const isExitNotes=await NotesModel.findById(notesId)
        if(!isExitNotes){
            return res.status(404).json({error:"Notes Not Found."})
        }

        if(isExitNotes.userId!=req.user._id){
            res.status(400).send({message:"You have not permissio to get notes"})
        }

       res.status(200).send({message:"Notes get successfully",notes:isExitNotes})
    } catch (error) {
        return res.status(400).json({message:error})
    }
}

const notesUpdate=async(req,res)=>{

    const {notesId}=req.params
    console.log(req.file)

    try {
        const isExitNotes=await NotesModel.findById(notesId)
        if(!isExitNotes){
            return res.status(404).json({error:"Notes Not Found."})
        }

        if(isExitNotes.userId!=req.user._id){
            res.status(400).send({message:"You have not permissio to get notes"})
        }

        if(req.file){
            await NotesModel.findByIdAndUpdate(notesId,{
                ...req.body,
                notesImage:req.file.filename,
            })    
            res.status(200).send({message:"notes updated successfully"})        
        }
        else
        {
            await NotesModel.findByIdAndUpdate(notesId,req.body)
            res.status(200).send({message:"notes updated successfully"})
        }
    } catch (error) {
        return res.status(400).json({message:error})
    }
}


// admin

const GetAllNotesByAdmin=async(req,res)=>{

   
  try {
    const totalNotes=await NotesModel.find()

    if(!totalNotes.length>0){
        return res.status(404).json({error:"Notes Not Found."})
    }
    res.status(200).send({message:"Notes get successfully",notes:totalNotes})
  } catch (error) {
    return res.status(400).json({message:error})
  }

}

const DeleteAllNotesByAdmin=async(req,res)=>{
    try {
        await NotesModel.deleteMany({})
        res.status(200).send({message:"Notes deleted successfully"})
    } catch (error) {
        return res.status(400).json({message:error})
    }
}
module.exports={noteCreate,notesDelete,getNotesByUser,getSingleUserNotes,notesUpdate,GetAllNotesByAdmin,DeleteAllNotesByAdmin}