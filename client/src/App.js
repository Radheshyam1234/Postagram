import React from 'react';
import { createContext,useReducer } from 'react'
import {Route,Switch} from 'react-router-dom'
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar'
import Signin  from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import Createpost from './components/Createpost/Createpost';
import UserrProfile from './components/UserProfile/UserrProfile'
import MyFollowingPost from './components/MyFollowingPost/Myfollowingpost'
import EditPost from './components/EditPost/EditPost';
import EditProfile from './components/Profile/EditProfile';
import Error from './components/Error';
import { reducer,initialState } from './reducers/userReducer';
import SavedPosts from './components/Savedposts/SavedPosts';
export const UserContext=createContext();

function App() {
  const history=useHistory();
  const[state,dispatch]=useReducer(reducer,initialState)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user)
     {
      // history.push('/');
      dispatch({type:"USER",payload:user})
      
      }
    else{
    history.push('/signin')}
  },[])
  

  return (
    
   
  <UserContext.Provider value={{state:state,dispatch:dispatch}}>
<Navbar/>
<Switch>
<Route exact path='/' component={Home}/>
<Route exact path='/myfollowingpost' component={MyFollowingPost}/>
  <Route exact path='/signin' component={Signin}/>
  <Route exact path='/signup' component={Signup}/>
  <Route exact path='/myprofile' component={Profile}/>
  <Route exact path='/createpost' component={Createpost}/>
  <Route exact path='/profile/:userid' component={UserrProfile}/>
  <Route exact path='/editpost/:postid' component={EditPost}/>
  <Route exact path='/editprofile' component={EditProfile}/>
  <Route exact path='/savedposts/:userId' component={SavedPosts}/>
  <Route  component={Error}/>
</Switch>
</UserContext.Provider>

   

  );
}

export default App;
