import React from 'react'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link,useHistory } from 'react-router-dom'
import { useState } from 'react'
import './Signin.css'
import { useContext } from 'react'
import { UserContext } from '../../App'
toast.configure()

const Signin = () => {
    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")
    const history=useHistory()
    const {state,dispatch}=useContext(UserContext)

 const submitData=()=>{
    fetch("/signinb",{
        method:"post",
        headers:{
            "content-Type":"application/json"
        },
        body:JSON.stringify({
            email,
            password
        })
   } ).then((res)=> {return (res.json())})
   .then( (data)=>{
      if( (data.error)){        
    // window.alert(data.error)
   toast.error( data.error,{position:toast.POSITION.TOP_CENTER})
             
      }
     else { 
       toast.success('Signed in successfully',{position:toast.POSITION.TOP_CENTER})
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify( data.user))
        dispatch({type:"USER",payload:data.user})
       // console.log(data.user)
      
         console.log(state)
        // {it will print token thay we had sent from sewrver side in response}
        //console.log(data)
        
        history.push('/')
     }
  
    })
 }

    return (


        <>
        <div className="signupForm">
        <div className="card ">
<form onSubmit={(e)=>{
    e.preventDefault() 
     submitData()}}>
<div className="card-header ">
  <h2 style={{color:"green"}}> Login </h2>
  </div>
  <div className="card-body">
  

  <div className="input-container">
    <i className="fa fa-envelope icon"></i>
    <input className="input-field" type="text" placeholder="Email"
        id="email" value={email}
  onChange={(e)=>{setemail(e.target.value)}}
    />
  </div>

  <div className="input-container">
    <i className="fa fa-key icon"></i>
    <input className="input-field" type="password" placeholder="Password" 
     id="password" value={password}
    onChange={(e)=>{setpassword(e.target.value)}}
    />
  </div>

  <button type="submit"  className="btn btn-secondary signin_btn">Sign in</button></div>
</form><br/>
<div className="card-footer">
Don't have an account ? <Link to="/signup">Create account</Link>
</div>

 </div>
</div>


        </>
        
    )
}

export default Signin
{/* <div>
            <Grid container>
              <Grid item xs={4}></Grid>
              <Grid className="signinpage" item xs={4}>
              <h3 style={{textAlign:"center", color:"red"}}>Instagram</h3><hr/>
              <input type="text"  placeholder=" Email"
                  value={email} onChange={(e)=>{setemail(e.target.value)}}
              />
              <br/>
              <input type="password" placeholder="Password"
                  id="password" value={password} onChange={(e)=>{setpassword(e.target.value)}}
              /><br/>
              <button type="submit" onClick={submitData} className="btn btn-block btn-primary">Sign in</button><br/><br/>
              <p><h6>--------------------OR----------------------</h6></p>
              <p>Don't have an account ? <Link to="/signup">Sign up</Link></p>
              </Grid>
              <Grid item xs={4}></Grid>

            </Grid>
        </div> */}