const express=require("express")
const { noteCreate, notesDelete, getNotesByUser, getSingleUserNotes, notesUpdate, GetAllNotesByAdmin, DeleteAllNotesByAdmin } = require("../controller/notes.controller")
const isAuth = require("../middleware/Auth")
const upload = require("../config/multer")
const isAdmin = require("../middleware/Checkrole")

const notesRouter=express.Router()


notesRouter.post("/create",isAuth,noteCreate)
notesRouter.delete("/delete/:notesId",isAuth,notesDelete)
notesRouter.get("/get/:userId",isAuth,getNotesByUser)
notesRouter.get("/singlenotes/:notesId",isAuth,getSingleUserNotes)
notesRouter.patch("/update/:notesId",isAuth,upload.single("file"),notesUpdate)

notesRouter.get("/getallnotes",isAuth,isAdmin,GetAllNotesByAdmin)
notesRouter.delete("/deleteallnotes",isAuth,isAdmin,DeleteAllNotesByAdmin)
module.exports=notesRouter