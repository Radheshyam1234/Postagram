import React from 'react'
import {toast} from 'react-toastify'
import { Link } from 'react-router-dom'
import FavoriteIcon  from '@material-ui/icons/Favorite'
import CancelIcon from '@material-ui/icons/Cancel'
import FavoriteBorderIcon  from '@material-ui/icons/FavoriteBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import { Avatar } from '@material-ui/core/'
import SendIcon from '@material-ui/icons/Send'
import { useEffect,useContext } from 'react'
import { useState } from 'react'
import { UserContext } from '../../App'
import myimage from '../../images/image1.jpg'
import './Home.css'
toast.configure()


const Home = () => {
    const [result,setResult]=useState([])
    const{state,dispatch}= useContext(UserContext);
    
    
   
   useEffect(()=>{
    fetch("/allposts",{
        method:"get",
        headers:{
            "content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
   } ).then(res=>res.json())
   .then(data=>{
      // console.log(data.post)
     setResult(data.post)
    // console.log(result)
   
   }).catch(err=>{console.log("Error")})

   },[result])


    const postLike=(id)=>{
        fetch("/like",{
            method:"put",
            headers:{
                "content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
           body:JSON.stringify({
               postId:id
           })
       } ).then(res=>res.json())
       .then(data=>{
         const newResult=result.map(item=>{
             if(item._id===data._id)
            { return data}
            else
            return item
         })
         setResult(newResult)
         
       })
       .catch(err=>{
        console.log(err)
    })
    }
    const postunlike=(id)=>{
        fetch("/unlike",{
            method:"put",
            headers:{
                "content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
           body:JSON.stringify({
               postId:id
           })
       } ).then(res=>res.json())
       .then(data=>{
        const newResult=result.map(item=>{
            if(item._id===data._id)
           { return data}
           else
           return item
        })
        setResult(newResult)
       })
       .catch(err=>{
           console.log(err)
       })
    }

     const makeComment=(text,postId)=>{
        fetch("/comment",{
            method:"put",
            headers:{
                "content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
           body:JSON.stringify({
              postId,
              text
           })
        }).then(res=>res.json())
        .then(data=>{
          const newResult=result.map(item=>{
              if(item._id===data._id)
             { return data}
             else
             return item
          })
          setResult(newResult)
          
        })
        .catch(err=>{
         console.log(err)
     })
     }
const deletepost=(postid)=>{
    fetch(`/deletepost/${postid}`,{
        method:"delete",
        headers:{
            "content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(data=>{
        console.log(data);
        const newResult=result.filter(item=>{
            
            return item._id!==data._id
          
        })
        setResult(newResult)
        toast.info( "Post deleted successfully",{position:toast.POSITION.TOP_CENTER})

    }).catch(err=>console.log(err))

}

const deleteComment=(postId,postedBy,text)=>{
    fetch(`/deletecomment`,{
        method:"delete",
        headers:{
            "content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId,
            postedBy:postedBy,
            text
         })
    }).then(res=>res.json())
    .then(data=>{
     const newResult=result.map(item=>{
         if(item._id===data._id)
        { return data}
        else
        return item
     })
     setResult(newResult)
    })
    .catch(err=>{
        console.log(err)
    })

    
}

const savePost=(postId)=>{
    fetch(`/favourite`,{
        method:"put",
        headers:{
            "content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId,
            
         })
    }).then(res=>res.json())
    .then( data=>{
        console.log(data)

       dispatch({type:"UPDATESAVEDPOST",payload:{savedpost:data.savedpost}})
       
       console.log(state)
        

    })
}

const unsavePost=(postId)=>{
    fetch(`/removefavourite`,{
        method:"delete",
        headers:{
            "content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId,
            
         })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
       //console.log(state)
        dispatch({type:"UPDATESAVEDPOST",payload:{savedpost:data.savedpost}})
        localStorage.setItem("user",JSON.stringify( data))
        console.log(state)

    })
}




    return ( <>
    { result ?

        <div className="home">
    
    {result.map(item=>{
      return( <>
         <div className="post" >
    <div className="post_header">
        <Avatar 
        className="post_avtar"
        alt="Radheshyam"
        src={item.postedBy.profilephoto}                   
        />
        <h5>
        {
            item.postedBy._id===state._id ?  <Link to='/myprofile'>{item.postedBy.name}</Link>
            : 
            <Link to={"/profile/"+item.postedBy._id}>{item.postedBy.name}</Link>
         }
       
        </h5> 
        
       
        <div >
          { 
           ( item.postedBy._id===state._id)  ?
           <div className="btn-group">
              <button className="btn btn-info dropdown-toggle btn-sm" data-toggle="dropdown">
                More
              </button>
            
              <div className="dropdown-menu">
                 <Link to ={"/editpost/"+item._id}> <p style={{cursor:"pointer",color:"black",textDecoration:"none",}}>Edit</p></Link>
                <p onClick={()=>{deletepost(item._id)}} style={{cursor:"pointer",}}>Delete</p>
               
              </div>
           </div>

           
            : state.savedpost.includes(item._id) ?
            <BookmarkIcon style={{cursor:"pointer"}} onClick={()=>{unsavePost(item._id)}}/>
            :<BookmarkBorderIcon style={{cursor:"pointer"}} onClick={()=>{savePost(item._id)}}/>
            
          }
        
        
        </div>
     </div>
        <img className="post_image" src={item.photo} alt="pic"/> 

             <div className="post_bottom">
                 <p className="cardBodyLikecountDiv">
                 
                 {  item.likes.includes(state._id) ?
                 < FavoriteIcon style={{color:"red"}} onClick={()=>{postunlike(item._id)}}/>
                 :
                 < FavoriteBorderIcon onClick={()=>{postLike(item._id)}}/>
                 
                 }
                 {item.likes.length} likes </p>  
                 {/* <hr/> */}
                 <div className="post_caption"><strong>{item.title}</strong></div>
                 <div className="post_description">{item.body}</div><hr/>
             {
             item.comments.map(commentRecord=>{
                 return(
                 
                 <>
                     <p> 
                     <strong >{commentRecord.postedBy.name}</strong> {commentRecord.text}
                    { 
                        commentRecord.postedBy._id===state._id    ?
                        < CancelIcon onClick={()=>{
                            deleteComment(item._id,commentRecord.postedBy._id,commentRecord.text)}}
                            
                            style={{color:"brown",cursor:"pointer"}}

                      />

                    :  ""
                    }
                     </p>
                 </>

                       )
                 })
             }
         

                 </div><hr/>

                     <div className="post_comment_box">

                 <form onSubmit={(e)=>{
                 e.preventDefault();
                 if(e.target[0].value.length===0)
                 return;
                 makeComment(e.target[0].value,item._id)
                 e.target[0].value="";
                 }}>  
                 <input type="text" style={{Width:"400px"}} className="commentInput" placeholder="add a comment" />
                 <button type="submit" className="comment_send_button" > <SendIcon  /></button>
                 </form>


                 </div>
   

 </div> </>
      )


})
    }



</div>
    :<h2> Loading the content....</h2>
    
    }
      
      </> 
    )
}

export default Home


{/* <div className="home ">
{ result.map(item=>{
   return (
       <>
    <div  className="card home-card" >
       <div className="card-header">{item.postedBy.name}</div>
       <div className="card-img-top">
         <img key= {item._id}src= {item.photo}  />
       </div>
         <div className="card-body">
        <p className="cardBodyLikecountDiv">
             
           {  item.likes.includes(state._id) ?
            < FavoriteIcon style={{color:"red"}} onClick={()=>{postunlike(item._id)}}/>
            :
          < FavoriteBorderIcon onClick={()=>{postLike(item._id)}}/>
          
           }
          {item.likes.length} likes</p><hr/>
       <div className="card-title">{item.title}</div>
       <div className="card-text">{item.body}</div><hr/>
        <h4>Comments</h4>
       <div>{
           item.comments.map(commentRecord=>{
               return(
            
             <>
                 <h6 >{commentRecord.postedBy.name}</h6>  {commentRecord.text}
             </>

               )
           })
       }</div>
       </div>
       <div className="card-footer">

            <form onSubmit={(e)=>{
               e.preventDefault();
              if(e.target[0].value.length==0)
              return;
               makeComment(e.target[0].value,item._id)
               e.target[0].value="";
           }}>  
            <input type="text" className="commentInput" placeholder="add a comment" />
           <button type="submit" > <SendIcon  /></button>
             </form>
           

       </div>
         



    </div><br/>
    </>

   )

})
   
    }
</div> */}


// <DeleteIcon onClick={()=>{deletepost(item._id)}} 
//            style={{color:"brown",cursor:"pointer"}}

//            />