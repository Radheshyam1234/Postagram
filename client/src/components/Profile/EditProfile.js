import React,{ useEffect,useState } from 'react'
import { useParams,  useHistory } from 'react-router'
import { useContext } from 'react'
import {toast} from 'react-toastify'
import { Link } from 'react-router-dom'
import { UserContext} from '../../App'
import './EditProfile.css'
toast.configure()

const EditProfile = () => {
    const {state,dispatch} =useContext(UserContext)
    const[result,setResult]=useState()
    const[name,setname]=useState()
    const[bio,setBio]=useState()
    const [image, setimage] = useState("");
    const[url,seturl]=useState("")



    const loadData=async()=>{
        fetch("/updateprofile",{
            method:"put",
            headers:{
                "content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            
        })
        .then(res=>res.json())
        .then( async data=>{
            console.log(data)
         setResult(await data)
          setname(await data.name)
          setBio(await data.description)
          
        })

        
     }

    useEffect( ()=>{
        loadData()
     //clean Up function
    
        return ()=>{
         
        }
        },[])
          
     useEffect(()=>{
                if(url){
                 fetch("/saveeditedprofilepicture",{
                     method:"put",
                     headers:{
                         "content-Type":"application/json",
                         "Authorization":"Bearer "+localStorage.getItem("jwt")
                     },
                     body:JSON.stringify({
                    
                        profilephoto:url
                      })
                } ).then((res)=> {return (res.json())})
                .then( (data)=>{
                   if( (data.error)){        
                     toast.error(data.error,{position:toast.POSITION.TOP_CENTER})
                          
                   }
                  else { 
                    
                     // {it will print token thay we had sent from sewrver side in response}
                     dispatch({type:"UpdatedProfilePic",payload:{profilephoto:data.profilephoto}})
                     toast.success("Profile picture saved",{position:toast.POSITION.TOP_CENTER})
               console.log(data)
                  }
               
                 })
                }
            },[url])

const  SaveEditPicture=()=>{

    const data= new FormData()
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","radheshyam11")

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

}
    
 const SaveProfile=()=>{
    
    fetch("/saveeditedprofile",{
        method:"put",
        headers:{
            "content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
       
           name:name,
           description:bio
         })
   } ).then((res)=> {return (res.json())})
   .then( (data)=>{
      if( (data.error)){        
        toast.error(data.error,{position:toast.POSITION.TOP_CENTER})
             
      }
     else { 
       
        // {it will print token thay we had sent from sewrver side in response}
        dispatch({type:"UpdatedProfile",payload:{name:data,name,bio:data.description}})
        toast.success("Saved Successfully",{position:toast.POSITION.TOP_CENTER})
  console.log(data)
     }
  
    })

 }       
      

    return (
        <div>
           {result   ?
        
        <div className="editpost_content">
        <div className=".editpost_form">
        <form onSubmit={(e)=>{
            e.preventDefault();
             SaveProfile()
            }}>
         
                <div className="form-group">
                    <label htmlFor="name">Edit Name</label>
                    <input type="text" className="form-control" 
                    placeholder="Write something here"
                    value={name}    
                    onChange={(e=>setname(e.target.value))} />
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">Add Bio</label>
                    <textarea className="form-control" 
                    placeholder="Write about yourself"
                    value={bio}    
                    onChange={(e=>setBio(e.target.value))} />
                </div>    
                <button type="submit" className="btn btn-success btn-block" >Save</button>
        </form> 

        <form 
         onSubmit={(e)=>{
            e.preventDefault();
             SaveEditPicture()
            }}
            >
            <hr/>
                <div className="form-group">
                        <label htmlFor="file">Add Profile Picture</label>
                        <input type="file" className="form-control" placeholder="Upload Picture"
                            //value={image}    
                        onChange={(e=>{setimage(e.target.files[0])
                        
                        })}
                        />
                        
                        </div>
                 <button type="submit" className="btn btn-info btn-block" >Save Picture</button>
     </form>
         
        </div>
        <button className="btn btn-white"style={{marginTop:"20px"}} >
        <Link to ='/myprofile' style={{textDecoration:"none"}}>Go to profile </Link>
        </button>
        </div>

        :<h2>Loading</h2>
    }
       




        </div>
    )
}


export default EditProfile





          