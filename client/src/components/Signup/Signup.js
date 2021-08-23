import React from 'react'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import './Signup.css'
import { useState } from 'react'
import { useHistory} from 'react-router'

toast.configure()


const Signup = () => {
    const [name,setname]=useState("")
const [email,setemail]=useState("")
const [password,setpassword]=useState("")

const history=useHistory()

    const submitData=()=>{
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)))
        return(toast.warning('Invalid Email address please enter correct email id',{position:toast.POSITION.TOP_CENTER}))
       
        fetch("/signupb",{
            method:"post",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password,
            })
       } ).then((res)=> {return (res.json())})
       .then( (data)=>{
          if( (data.error)){        
        // window.alert(data.error)
        toast.error(data.error,{position:toast.POSITION.TOP_CENTER})
                 
          }
          else if((data.message)){          
            //window.alert(data.message)
            toast.success(data.message,{position:toast.POSITION.TOP_CENTER})
              history.push('/signin')
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
  <h2 style={{color:"green"}}> Sign Up Here </h2>
  </div>
  <div className="card-body">
  <div className="input-container">
    <i className="fa fa-user icon"></i>
    <input className="input-field" type="text" placeholder="Username"
    id="Username" value={name}
    onChange={(e)=>{setname(e.target.value)}} />
  </div>

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

  <button type="submit"  className="signup_btn">Register</button></div>
</form><br/>
<div className="card-footer">
Have an account ? <Link to="/signin">Sign in</Link>
</div>

 </div>
</div>


        </>
    )
}

export default Signup


{/* <Grid container>
<Grid item xs={4}></Grid>


<Grid className="signuppage" item xs={4}>

<h3 style={{textAlign:"center", color:"red"}}>Instagram</h3><hr/>

<input type="text"  placeholder=" Name"
    id="name" value={name}
    onChange={(e)=>{setname(e.target.value)}}
/>
<br/>
<input type="text" placeholder="Email"
  id="email" value={email}
  onChange={(e)=>{setemail(e.target.value)}}
/>            <br/>
<input type="password" placeholder="Password"
    id="password" value={password}
    onChange={(e)=>{setpassword(e.target.value)}}
/>
        <br/>
<button type="submit" onClick={submitData} className="btn btn-block btn-primary">Sign up</button><br/><br/>

<h6>--------------------OR----------------------</h6>
<p> Have an account ? <Link to="/signin">Sign in</Link></p>
</Grid>


<Grid item xs={4}>
    
</Grid>
</Grid> */}
