import React,{ useEffect,useState } from 'react'
import { useParams,  useHistory } from 'react-router'
import {toast} from 'react-toastify'
import { Link } from 'react-router-dom'
import './EditPost.css'
toast.configure()

const EditPost = () => {
    const {postid} =useParams();
    const history=useHistory()
    const[result,setResult]=useState()
    
     const[title,setTitle]=useState()
     const[body,setBody]=useState()

     const loadData=async()=>{
        fetch(`/editpost`,{
            method:"put",
            headers:{
                "content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
             postId:postid
           })
        })
        .then(res=>res.json())
        .then( async data=>{
         setResult(await data)
          setTitle(await data.title)
          setBody(await data.body)
          
        })

        
     }

    useEffect( ()=>{
        loadData()
     //clean Up function
    
        return ()=>{
         
        }
        },[])

const EditPost=()=>{
    
    fetch(`/saveeditedpost`,{
        method:"put",
        headers:{
            "content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
         postId:postid,
         title:title,
         body:body
       })
    }).then(res=>res.json())
    .then(data=>{
        toast.success( "Post saved successfully",{position:toast.POSITION.TOP_CENTER})
       
    })
    .catch(err=>{
        console.log(err)
    })
    
}
    return (
        <div>
        {result   ?
        
            <div className="editpost_content">
            <div className=".editpost_form">
            <form onSubmit={(e)=>{
                e.preventDefault();
                EditPost()
                }}>

             <div className="form-group">
                 <label htmlFor="title">Title</label>
                 <input 
                 type="text" className="form-control"
                  placeholder="Add caption"
                  value={title}    
                  onChange={(e=>setTitle(e.target.value))}
                  />
             </div>
             <div className="form-group">
                 <label htmlFor="body">Body</label>
                 <textarea className="form-control" 
                 placeholder="Write something here"
                 value={body}    
                  onChange={(e=>setBody(e.target.value))} />
             </div>
            
             <button type="submit" className="btn btn-success btn-block" >Save</button>
            

            </form> 
             
            </div>
            <button className="btn btn-white"style={{marginTop:"20px"}} ><Link to ='/' style={{textDecoration:"none"}}>Go Back </Link></button>
            </div>

            :<h2>Loading</h2>
        }
           

        </div>
    )
}

export default EditPost