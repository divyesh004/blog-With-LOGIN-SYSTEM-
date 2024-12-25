import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import NotesCard from "../components/NotesCard";
// import {Button, Form} from "react-bootstrap"

const NotesPage = () => {
  const UserData = JSON.parse(localStorage.getItem("userData"));
  console.log(UserData);

  const [notes, setnotes] = useState([]);

  const GetAllUserNotes = () => {
    axios.get(`${import.meta.env.VITE_BASEURL}/notes/get/${UserData?._id}`, {
        withCredentials: true
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
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex flex-column flex-md-row"
    >
      <div className="w-100">
        <h1 className="text-3xl font-semibold border-bottom border-gray-500 p-3 mt-5">
          Notes results:
        </h1>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)"}}>
          {notes.length > 0 ? (
            notes.map((el) => (
              <div>
                <NotesCard
                  key={el._id}
                  title={el.title}
                  body={el.body}
                  id={el._id}
                  image={el.notesImage}
                  GetAllUserNotes={GetAllUserNotes}
                  UserId={UserData._id}
                />
              </div>
            ))
          ) : (
            <div className="p-4 d-flex flex-wrap gap-4">
              <p className="text-xl text-gray-500">No Notes found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
