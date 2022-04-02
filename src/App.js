import React, {Component,useEffect,useState} from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import CardList from './components/CardList'
import Signup from './components/Signup';
import Nav from './components/Nav'
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import './App.css';
import io from "socket.io-client";


const socket = io("http://127.0.0.1:3002");
// const username = localStorage.getItem("username")
// const password = localStorage.getItem("password")
      
function App() {
  // login(username,password)
  const [users,setUsers] = useState([]);
  const [usernames,setUsernames] = useState([]);
  const [user,setUser] = useState();
  const [loggedIn,setLoggedIn] = useState(false);
  const [clicks,setClicks] = useState();
  useEffect(()=>{
    fetch("http://localhost:3002/users")
          .then(response=>response.json())
          .then(result=>{
            setUsers(result)
              // this.setState({users:result});
          })
      fetch("http://localhost:3002/usernames")
      .then(response=>response.json())
      .then(result=>{
        setUsernames(result)
        // this.setState({usernames:result})
      })
      
      socket.on('new_user',(_user)=>{
        setUsers(oldArray => [...oldArray, _user]);
        setUsernames(oldArray => [...oldArray, _user.display_name]);
      })
      socket.on('userList',(l)=>{
        setUsers(l)
      })
  },[])

  function login(u,p){
    if (u!=null) {
      var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "display_name": u,
            "password": p
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3002/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result!=false) {
                    setUser(result)
                    setClicks(result.clicks)
                    changeLogin(true)
                    
                    
                }
                else{
                    alert("invalid creds")
                }
            })
            .catch(error => console.log('error', error));
      
    }
    
  }
  function changeLogin(state){
    setLoggedIn(state)
  }

  // updateUsers=(users,usernames)=>{
  //   this.setState({users:users,usernames:usernames})
  // }


  const nav = <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} setClicks={setClicks}/>
  return(
        <Router>
            {nav}
          <Routes>
            <Route exact path='/' element={<CardList users={users} user={user} loggedIn={loggedIn} setUsers={setUsers} setUser={setUser} clicks={clicks} setClicks={setClicks}/>}/>
            <Route path='/login' element={<Login setUser={setUser} loggedIn={loggedIn} changeLogin={changeLogin} setClicks={setClicks}/>}/>
            <Route exact path='/signup' element={<Signup usernames={usernames} />}/>
            <Route exact path='/profile' element={<Dashboard user={user} usernames={usernames} setUsers={setUsers} setUser={setUser} changeLogin={changeLogin}/>}/>
            <Route exact path='/loading' element={"loading"}/>
          </Routes>
        </Router>
      )
    
}

export default App;