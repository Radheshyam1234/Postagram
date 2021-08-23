import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router'


 const SavedPosts = () => {
  const[savedPosts,setSavedPosts]= useState()

const{userId}=useParams()

const fetchPost=async ()=>{
    fetch(`/mysavedposts/${userId}`,{
        method:"get",
        headers:{
            "content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }

    }).then(res=>res.json())
      .then(async result=>{
        
          setSavedPosts(await result.savedpost)
         
      })
      .catch(err=>{
          console.log(err)
      })
}

  useEffect(()=>{
    fetchPost()

  return ()=>{}
  },[])

    return (
        <> {
            savedPosts ?
            <div className="gallery">
          
          { savedPosts.map(item=>{
              return(
              <img src={item.photo} alt="images"/>
              )

           })
          }
             
         </div> 
        : <h3 style={{textAlign:"center"}}>No saved Posts to display</h3>
        }
           
        </>
    )
}

export default SavedPosts