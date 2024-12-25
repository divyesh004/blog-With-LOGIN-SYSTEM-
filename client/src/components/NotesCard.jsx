import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const NotesCard = ({title,body,id,image,GetAllUserNotes,UserId}) => {

  console.log(image)

  const handleDelete=(id)=>{
    axios.delete(`${import.meta.env.VITE_BASEURL}/notes/delete/${id}`,{
      withCredentials:true
    })
    .then((res)=>{
      console.log(res.data)
      GetAllUserNotes(UserId)
      toast.success(res?.data?.message || "Notes Deleted")
    })
    .catch((err)=>{
      console.log(err)
      toast.error(err?.response?.data?.message || "Error deleting notes")
    })
  }

  return (
    <div className='col-md-6 col-lg-8 m-auto pt-2' >
        <div className='card border-0 shadow-sm h-100' >
            <Link to={`/singlenote/${id}`}>
                <img src={image[0]=="h" ? image : `${import.meta.env.VITE_BASEURL}/${image}`} alt="Notes Cover" className='card-img-top img-fluid' style={{height:"260px",objectFit:"cover"}} />
            </Link>
            <div className='card-body d-flex flex-column'>
                <h5 className='card-title text-center text-truncate'>{title}</h5>

                <div style={{display:"flex",justifyContent:"space-between",padding:"10px"}}>
                  <div>
                    <button style={{border:"none",backgroundColor:"black",color:"white",padding:"5px 20px",borderRadius:"5px"}}><Link to={`/update/${id}`} style={{textDecoration:"none",color:"white"}}>Edit</Link></button>
                  </div>
                  <div>
                    <button style={{border:"none",backgroundColor:"black",color:"white",padding:"5px 20px",borderRadius:"5px"}} onClick={()=>handleDelete(id)}>Delete</button>
                  </div>
                </div>
                <Link to={`/singlenote/${id}`} className='btn btn-outline-primary mt-auto'>Read artical </Link>
            </div>
        </div>
      
    </div>
  )
}

export default NotesCard
