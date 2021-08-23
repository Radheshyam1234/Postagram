import React from 'react'
import {toast} from 'react-toastify'
import './Createpost.css'
import Grid from  '@material-ui/core/Grid'
import { useState,useEffect } from 'react';
import { useHistory } from 'react-router';
toast.configure()
const Createpost = () => {
       const[title,setTitle]= useState("")
       const [body, setbody] = useState("")
       const [image, setimage] = useState("");
       const[url,seturl]=useState("")
       const history=useHistory()
       useEffect(()=>{
           if(url){
            fetch("/createpost",{
                method:"post",
                headers:{
                    "content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    pic:url
                    
                })
           } ).then((res)=> {return (res.json())})
           .then( (data)=>{
              if( (data.error)){        
                toast.error(data.error,{position:toast.POSITION.TOP_CENTER})
                     
              }
             else { 
               
                // {it will print token thay we had sent from sewrver side in response}
                toast.success( "Post created successfully",{position:toast.POSITION.TOP_CENTER})
                
                history.push('/')
             }
          
            })
           }
       },[url])


       const postData=(e)=>{
         e.preventDefault();
         const data= new FormData()
        
         data.append("file",image)
         data.append("upload_preset","insta-clone")
         data.append("cloud_name","radheshyam11")

         //make a network request to cloudinary it will return an url 

         fetch("https://api.cloudinary.com/v1_1/radheshyam11/image/upload",{
             method:"post",
             body:data
         }).then(res=>res.json())
         .then(data=>{
             
           
           console.log(data.url)
             seturl(data.url)
         }).catch(err=>{
             console.log(err)
         })
        
         //make a network request to backend
       

       }


    return (
        <div >
        <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
         <div className="createpost_content">
         
            <form onSubmit={postData}>

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
                 <input type="text" className="form-control" 
                 placeholder="Write something here"
                 value={body}    
                  onChange={(e=>setbody(e.target.value))}
                 />
             </div>
             <div className="form-group">
                 <label htmlFor="file">Add Image</label>
                 <input type="file" className="form-control" placeholder="Upload image"
                     //value={image}    
                  onChange={(e=>{setimage(e.target.files[0])
                  
                  })}
                 />
             </div>
             <button type="submit" className="btn btn-success" >Create post</button>

            </form> </div></Grid>
           
            <Grid item xs={2}></Grid>
            </Grid>
        </div>
    )
}

export default Createpost
