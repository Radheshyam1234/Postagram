import React from 'react'
import { NavLink,useHistory } from 'react-router-dom'
//import { useEffect } from 'react'
import './Navbar.css'

import { useContext } from 'react'
import { UserContext } from '../../App'
//import { Direction } from 'react-toastify/dist/utils'

const Navbar = () => {
  const{state,dispatch}= useContext(UserContext)
  const history=useHistory()
  
const renderlist=()=>{
    if(state){
      return[
        // <div className="nav_header"> 
          
      <div className="nav_item"><NavLink to='/' activeStyle={{color:"brown"}}>Home</NavLink></div>,
    
       <div className="nav_item"><NavLink to='/myfollowingpost' activeStyle={{color:"coral"}}> Following</NavLink></div> ,
        
       <div className="nav_item"><NavLink to='/myprofile' activeStyle={{color:"coral"}}> Profile</NavLink></div> ,
        
      <div className="nav_item"><NavLink to='/createpost' activeStyle={{color:"coral"}}> Createpost</NavLink></div>,

      <div className="nav_item">
        <button className="btn btn-danger" onClick={()=>{
          localStorage.clear()
          dispatch({type:"LOGOUT"})
          history.push('/signin')
        }}> Logout</button>
        </div>
        // </div>

        
      ]
    }
    else{
      return[
        <div className="nav_item" style={{fontFamily:"cursive"}}>
        <NavLink to ={state?'/':'/signin'}>Postogram</NavLink> </div>,
        
        <div className="nav_item">
          <NavLink to='/signin'  activeStyle={{color:"coral"}}> Signin</NavLink></div>,

        <div className="nav_item"> 
        <NavLink to='/signup'  activeStyle={{color:"coral"}}>Signup </NavLink></div>
      ]
    }
}

    return (
        <div className="nav_header">
 
   
   
         {renderlist()} 
         </div>   
     
    )
}

export default Navbar





// if(state){
//   return[
//     <div className="col-sm col"> 
      
//     <NavLink to='/' activeStyle={{color:"brown"}}>Home</NavLink></div>,

//     <div className="col-sm col"> 
//     <NavLink to='/myfollowingpost' activeStyle={{color:"coral"}}> My Following</NavLink></div>,


//     <div className="col-sm col"> 
//     <NavLink to='/myprofile' activeStyle={{color:"coral"}}> Profile</NavLink></div>,

//     <div className="col-sm col"> 
//     <NavLink to='/createpost' activeStyle={{color:"coral"}}> Createpost</NavLink></div>,<div className="col-sm col"> 

//     <button className="btn btn-danger" onClick={()=>{
//       localStorage.clear()
//       dispatch({type:"LOGOUT"})
//       history.push('/signin')
//     }}> Logout</button></div>,

    
//   ]
// }
// else{
//   return[
//     <div className="col-sm col ">
//       <NavLink to='/signin'> Signin</NavLink></div>,

//     <div className="col-sm col"> 
//     <NavLink to='/signup'>Signup </NavLink></div>
//   ]
// }
// }
