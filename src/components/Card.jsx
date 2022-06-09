import React, { Component,useEffect } from 'react';
import io from "socket.io-client";


const socket = io("http://127.0.0.1:3002");
function Card({ name, display_name, img_url, bio, id, theme, clicks, rank, badge, login, user, users, setUser, setUsers,click,setClick }) {
    
    function counter() {
        setClick(click+1)
        setUser(prevState => ({
            ...prevState,
            "clicks": click+1
          }));
        console.log("fool")
        socket.emit("click",user.display_name)
    }
    useEffect(async()=>{
        //  const usr = 
        try{

            document.querySelector(".loggedIn-card").scrollIntoView({ behavior: 'smooth','block':'center'})
        }
        catch(error){
            console.log(error)
        }
        
    })

    if (login) {
        return (
            <div className="card loggedIn-card" id={id} onClick={counter}>
                <img className='profile-picture' src={img_url} alt="" />
                <h1 className='name'>{name}</h1>
                <h2 className='displayName'>{display_name}</h2>
                <p>{bio}</p>
                <h3>{clicks}</h3>
                <img title={badge} className='badge' src={require(`./badges/${badge}.png`)} alt="" />
            </div>
        )
    }
    else {
        return (
            <div className="card" id={id}>
                <img className='profile-picture' src={img_url} alt="" />
                <h1 className='name'>{name}</h1>
                <h2 className='displayName'>{display_name}</h2>
                <p>{bio}</p>
                <h3>{clicks}</h3>
                <img title={badge} className='badge' src={require(`./badges/${badge}.png`)} alt="" />
            </div>
        )
    }
}

export default Card;