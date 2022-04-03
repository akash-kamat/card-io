import React, { Component, useEffect, useState, } from 'react'
import Card from './Card'
import io from 'socket.io-client'

const socket = io("http://127.0.0.1:3002");
function CardList({ users, user, setUser, setUsers, loggedIn, clicks, setClicks }) {
    const [userList , setUserList] = useState([]);
    useEffect(()=>{
        const _userList = users.sort((a, b) => (a.clicks < b.clicks ? 1 : -1))
        setUserList(_userList)
        
    })

    return (
        <div className="cardlist">
            {
                userList.map((e, i) => {
                    if (!loggedIn) {
                        return <Card key={i} name={e.name} display_name={e.display_name} img_url={e.img_url} bio={e.bio} id={e.id} clicks={e.clicks} rank={e.rank} badge={e.badge} />

                    }
                    else {
                        if (e.display_name != user.display_name) {
                            return <Card key={i} name={e.name} display_name={e.display_name} img_url={e.img_url} bio={e.bio} id={e.id} clicks={e.clicks} rank={e.rank} badge={e.badge} />
                        }
                        else {
                            return <Card user={user} users={users} setUser={setUser} setUsers={setUsers} click={clicks} setClick={setClicks} key={i} login={true} name={e.name} display_name={e.display_name} img_url={e.img_url} bio={e.bio} id={e.id} clicks={e.clicks} rank={e.rank} badge={e.badge} />

                        }
                    }

                })
            }
        </div>
    )

}
export default CardList;
