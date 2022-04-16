import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, ButtonBase, AppBar, Toolbar, Typography } from '@mui/material'

export default class Nav extends Component {
  render() {
    const { loggedIn, setLoggedIn, setUser, setClicks } = this.props;
    if (loggedIn) {
      return (
        <>
        <AppBar position="relative" color="primary">
          <Toolbar>
            <Typography variant="h6">
              sds
            </Typography>
          </Toolbar>
        </AppBar>
          <div className='navdiv'>
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/profile"}>
              <li>Profile</li>
            </Link>
            <Link to={"/"}>
              <li onClick={() => { setLoggedIn(false); setUser(); setClicks(); localStorage.clear() }}>Logout</li>
            </Link>
            <button onClick={() => document.querySelector(".loggedIn-card").scrollIntoView({ behavior: 'smooth', 'block': 'center' })}>Goto My-Card</button>
          </div>
        </>
      )
    }
    else {
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
