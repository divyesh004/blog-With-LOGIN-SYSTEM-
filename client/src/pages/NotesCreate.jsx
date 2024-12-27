import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";


const NotesCreate = () => {

    const [title,settitle]=useState("")
    const [body, setbody]=useState("")

    const handleSubmit=(e)=>{
        e.preventDefault()

        let notesdata={title,body}

        axios.post(`${import.meta.env.VITE_BASEURL}/notes/create`,notesdata,{
            withCredentials:true
        })
        .then((res)=>{
            console.log(res)
            toast.success(res.data.message || "Notes Created Successfully")
            setbody("")
            settitle("")
        })
        .catch((err)=>{
            console.log(err)
            toast.error(err.response.data.message || "Error Occured")
        })
    }
  return (
    <div
      className="container p-3 max-w-3xl mx-auto min-vh-100"
      style={{ maxWidth: "60%" }}
    >
      <h1 className="text-center my-4">Create a Note</h1>
      <Form className="d-flex  flex-column gap-3" onSubmit={handleSubmit}>
        <Form.Group className="d-flex  flex-wrap gap-3">
          <Form.Control
            type="text"
            placeholder="Enter Title"
            className="flex-fill"
            value={title} onChange={(e)=>settitle(e.target.value)}
          />
          <Form.Control
            type="text"
            placeholder="Enter Your Content"
            className="flex-fill"
            value={body} onChange={(e)=>setbody(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Publish
        </Button>
      </Form>
    </div>
  );
};

export default NotesCreate;
