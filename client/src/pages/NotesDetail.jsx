import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const NotesDetail = () => {

    const {notesId}=useParams()
    const [notes,setnotes]=useState({})

    console.log([notes.notesImage][0])

    const GetAllUserNotes = () => {
        axios
          .get(`${import.meta.env.VITE_BASEURL}/notes/singlenotes/${notesId}`, {
            withCredentials: true,
          })
          .then((res) => {
            setnotes(res.data.notes);
           
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      useEffect(() => {
        GetAllUserNotes();
      }, []);
      
  return (
    <div className='container my-4' style={{minHeight:"77vh"}}>
      <div className='row justify-content-center mb-4'>
        <div className='col-md-8'>
            <div className='text-center'>
                <img src={[notes?.notesImage][0]=="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4jtQJ84u5QiC63ZSW75jYatsjZXz87pLNFA&s" ? notes?.notesImage : `${import.meta.env.VITE_BASEURL}/${notes?.notesImage}`} alt="Note Title" className='img-fluid rounded mb-3' height={500} width={500} />
                <h2>{notes.title}</h2>
                <div className='blog-content'>{notes.body}</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default NotesDetail
