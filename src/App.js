import React, {Component,useEffect,useState} from 'react';
import { BrowserRouter as Router,Routes,Route,useNavigate } from 'react-router-dom';
import CardList from './components/CardList'
import Signup from './components/Signup';
import Nav from './components/Nav'
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import Search from './components/Search';
import './App.css';
import io from "socket.io-client";


const socket = io("http://127.0.0.1:3002");

      
function App() {

  const navigate = useNavigate()
  const [users,setUsers] = useState([]);
  const [usernames,setUsernames] = useState([]);
  const [user,setUser] = useState();
  const [loggedIn,setLoggedIn] = useState(false);
  const [clicks,setClicks] = useState();
  const [searchValue,setSearchValue] = useState('');

  useEffect(()=>{
      navigate('/loading')
      fetch("http://localhost:3002/users")
          .then(response=>response.json())
          .then(result=>{
            navigate('/')
            setUsers(result)
          })
      fetch("http://localhost:3002/usernames")
      .then(response=>response.json())
      .then(result=>{
        setUsernames(result)
      })
    
    
      
      socket.on('new_user',(_user)=>{
        setUsers(oldArray => [...oldArray, _user]);
        setUsernames(oldArray => [...oldArray, _user.display_name]);
      })
      socket.on('userList',(l)=>{
        setUsers(l)
      })
      const username = localStorage.getItem("username")
      const password = localStorage.getItem("password")

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
      login(username,password)
      window.addEventListener('dblclick',function(){
        if (loggedIn) {
          document.querySelector(".loggedIn-card").scrollIntoView()
        }
      })

      

  },[])

  function changeLogin(state){
    setLoggedIn(state)
  }

  const filteredUsers = users.filter(
    person => {
      return (
        person
        .name
        .toLowerCase()
        .includes(searchValue.toLowerCase()) ||
        person
        .display_name
        .toLowerCase()
        .includes(searchValue.toLowerCase())
      );
    }
  );

  function onSearch(e){
    setSearchValue(e.target.value)
  }
  const nav = <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} setClicks={setClicks}/>
  return(
        <div>
            {nav}
            <Search onSearch={onSearch}/>
          <Routes>
            <Route exact path='/' element={<CardList users={filteredUsers} user={user} loggedIn={loggedIn} setUsers={setUsers} setUser={setUser} clicks={clicks} setClicks={setClicks}/>}/>
            <Route path='/login' element={<Login setUser={setUser} loggedIn={loggedIn} changeLogin={changeLogin} setClicks={setClicks}/>}/>
            <Route exact path='/signup' element={<Signup usernames={usernames} />}/>
            <Route exact path='/profile' element={<Dashboard user={user} usernames={usernames} setUsers={setUsers} setUser={setUser} changeLogin={changeLogin}/>}/>
            <Route exact path='/loading' element={"loading"}/>
          </Routes>
          </div>
        
      )
    
}

export default App;