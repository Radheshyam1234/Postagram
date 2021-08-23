import React, { useContext, useEffect,useState} from 'react'
import './Profile.css'
import image1 from '../../images/image1.jpg'
import { UserContext} from '../../App'
import { Link } from 'react-router-dom'

const Profile = () => {
    const [result, setResult] = useState([])
   const {state,dispatch} =useContext(UserContext)
    useEffect(()=>{
        fetch("/mypost",{
            method:"get",
            headers:{
                "content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
       } ).then(res=>res.json())
       .then(data=>{
       
           setResult(data.myposts)
         
       }).catch(err=>{console.log("Error")})
    
   return ()=>{}


       },[])
         


    return (<>
        {  state?
       
        <div className="profile_page">
            <div className="profile_information">
                <div>
                     <img className="profile_image" src={state.profilephoto} alt="profile_pic"/>
                     <p style={{fontFamily:"cursive",fontWeight:"normal"}}>{state.description}</p>
                </div>
                  
                <div className="profile_info">
                     <div className="user_name">
                         <h6>{state?state.name:"loading"}</h6>
                         <h6 ><a style={{textDecoration:"none"}} href="mailto:{state.email}">{state.email}</a></h6>
                    </div>
                         <div className="post_follwer_info">
                         
                         <h6>{state.followers.length} Followers</h6>
                         <h6>{state.following.length} Following</h6>
                         <h6>{result.length} Posts</h6>
                         </div>
                         <div>
                     <Link to = '/editprofile'> <button className="btn btn-white">
                     <h6>Update Profile</h6>
                     </button></Link>
                </div>
                         </div>

               
            </div>
            <hr/>
            <h2 style={{textAlign:"center"}}>Uploaded Images</h2><br/>
          <div className="gallery">
          
           { result.map(item=>{
               return(
               <img src={item.photo} alt="images"/>
               )

            })
           }
              
          </div> <hr/>
         <p style={{textAlign:"center"}}> 
         <Link to = {"/savedposts/"+state._id}> <button className="btn btn-info">
                     <h6>See saved posts</h6>
                     </button></Link></p>
          {/* <div className="gallery">
         
           { state.savedpost.map(item=>{
               return(
               <img src={item.photo} alt="images"/>
               )

            })
           }
              
          </div> */}
        
        </div>
        :<h2>loading</h2>
       
     } 
     </>)
}

export default Profile

