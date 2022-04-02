import React, { Component,useRef } from 'react'
import {Navigate, useNavigate} from 'react-router-dom'


function Login({changeLogin,setUser,setClicks}) {
    const navigate = useNavigate()
    function login(){
        const display_name = document.getElementById('username').value
        const password = document.getElementById('password').value
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "display_name": display_name,
            "password": password
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
                    navigate('/')
                    localStorage.setItem("username",display_name)
                    localStorage.setItem("password",password)
                    
                }
                else{
                    alert("invalid creds")
                }
            })
            .catch(error => console.log('error', error));
    }

        return (
            <div>
                <input type="text" name="username" id="username" placeholder='username'/>
                <input type="password" name="password" id="password" placeholder='password' />
                <button onClick={login}>Login</button>
            </div>
        )

}
export default Login;