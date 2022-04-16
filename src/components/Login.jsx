import React, { Component,useEffect } from 'react'
import {Navigate, useNavigate} from 'react-router-dom'


function Login({changeLogin,setUser,setClicks}) {
    const navigate = useNavigate()
    useEffect(()=>{
        document.querySelector('#password').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                document.querySelector('#loginBtn').click();
            }
        });
    })
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
        navigate('/loading')
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
                    navigate('/login')
                }
            })
            .catch(error => console.log('error', error));
    }

        return (
            <div>
                <input type="text" name="username" id="username" placeholder='username'/>
                <input type="password" name="password" id="password" placeholder='password' />
                <button id='loginBtn' onClick={login}>Login</button>
            </div>
        )

}
export default Login;