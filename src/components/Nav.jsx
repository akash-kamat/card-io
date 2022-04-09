import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Nav extends Component {
  render() {
    const {loggedIn,setLoggedIn,setUser,setClicks} = this.props;
    if (loggedIn){
      return (
        <div className='navdiv'>
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/profile"}>
            <li>Profile</li>
          </Link>
          <Link to={"/"}>
            <li onClick={()=>{setLoggedIn(false);setUser();setClicks();localStorage.clear()}}>Logout</li>
          </Link>
        </div>
      )
    }
    else{
      return (
        <div>
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/login"}>
            <li>Login</li>
          </Link>
          <Link to={"/signup"}>
            <li>Signup</li>
          </Link>
        </div>
      )
    }
  }
}
