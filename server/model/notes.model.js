const mongoose=require("mongoose")

const notesSchema=new mongoose.Schema({
    title:String,
    body:String,
    notesImage:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4jtQJ84u5QiC63ZSW75jYatsjZXz87pLNFA&s"
    },
    userId:{
        type:String,
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})


const NotesModel=mongoose.model("note",notesSchema)

module.exports=NotesModel