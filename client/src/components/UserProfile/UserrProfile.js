import React,{useState, useContext, useEffect}from 'react'
import { UserContext } from '../../App'
import { useParams } from 'react-router'
import image1 from '../../images/image1.jpg'


 const UserrProfile = () => {

     const [userProfile,setProfile] =useState(null)
     const {state,dispatch}=useContext(UserContext)
    const {userid}= useParams()
    
      useEffect(()=>{
          fetch(`/user/${userid}`,{
            method:"get",
            headers:{
                "content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then( data=>{
           setProfile(data)
          // console.log(data)
          
        })
          },[])
     
const followUser=()=>{
  fetch("/follow",{
    method:"put",
    headers:{
        "content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
    body:JSON.stringify({
     followId:userid
  })
  }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      dispatch({type:"UPDATEFOLLOWERS",payload:{following:data.following,followers:data.followers}})
      localStorage.setItem("user",JSON.stringify(data))
     setProfile((prevState)=>{
      return{
        ...prevState,
        user:{
          ...prevState.user,
          followers:[...prevState.user.followers,data._id]
        }
      }
     })



    })
}

const unfollowUser=()=>{
  fetch("/unfollow",{
    method:"put",
    headers:{
        "content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
    body:JSON.stringify({
     unfollowId:userid
  })
  }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      dispatch({type:"UPDATEFOLLOWERS",payload:{following:data.following,followers:data.followers}})
      localStorage.setItem("user",JSON.stringify(data))
     setProfile((prevState)=>{
       const newFollower  = prevState.user.followers.filter((item)=>{return (item!==data._id)})
      return{
        ...prevState,
        user:{
          ...prevState.user,
          followers:newFollower
        }
      }
     })



    })
}






    return  (<>

      {userProfile?
           
        <div className="profile_page">
            <div className="profile_information">
                <div>
                     <img className="profile_image" src={userProfile.user.profilephoto} alt="profile_pic"/>
                </div>
                <div className="profile_info">
                     <div className="user_name">
                         <h5>{userProfile.user.name}</h5>
                         <h6 ><a style={{textDecoration:"none"}} href="mailto:{userProfile.user.email}">{userProfile.user.email}</a></h6>
                         
                    </div>
                         <div className="post_follwer_info">
                         <h6>{userProfile.posts.length} posts</h6>
                         <h6>{userProfile.user.followers.length} Followers</h6>
                         <h6>{userProfile.user.following.length} Following</h6>
                         {
                           userProfile.user.followers.includes(state._id)
                           ?
                          <p><button 
                         className="btn btn-danger"
                          onClick={()=>unfollowUser()}>
                         Unfollow
                         </button></p>
                         :
                         <p><button 
                         className="btn btn-success"
                          onClick={()=>followUser()}>
                         Follow
                         </button></p>
                         }
                        
                        
                         
                         </div>
                     
                         </div>

               
            </div>
            <hr/>

          <div className="gallery">
           { userProfile.posts.map(item=>{
               return(
               <img key={item._id} src={item.photo} alt="images"/>
               )

            })
           }
              
          </div>

        
        </div>
        :<h2     > Loading....</h2>
      }
        
        </>
    )
 }

export default UserrProfile