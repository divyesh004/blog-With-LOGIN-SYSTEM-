import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Homepage from './pages/Homepage'
import SignIn from './pages/SignIn'
import SignUp from './pages/Signup'
import NotesPage from './pages/NotesPage'
import NotesCreate from './pages/NotesCreate'
import NotesDetail from './pages/NotesDetail'
import PrivateRoutes from './components/Privateroute'
import Update from './pages/Update'
import GetAllNotes from './pages/GetAllNotes'

const Allroutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/notes" element={
          <PrivateRoutes>
          <NotesPage />
          </PrivateRoutes>
          }></Route>
        <Route path="/create-notes" element={<NotesCreate />}></Route>
        <Route path="/singlenote/:notesId" element={<NotesDetail />}></Route>
        <Route path="/update/:notesId" element={<Update />}></Route>
        <Route path="/getallnotes" element={<GetAllNotes />}></Route>
    </Routes>
  )
}

export default Allroutes
