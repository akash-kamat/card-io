import React, { Component, useEffect, useState, } from 'react'
import Card from './Card'
import io from 'socket.io-client'
import './css/CardList.css'

const socket = io("http://127.0.0.1:3002");
function CardList({ users, user, setUser, setUsers, loggedIn, clicks, setClicks }) {
    useEffect(() => {
        if (loggedIn) {
            const mybutton = document.getElementById("myBtn");
            const mybutton2 = document.getElementById("myBtn2");
            window.onscroll = function () { scrollFunction() };

            function scrollFunction() {
                if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
                    mybutton.style.display = "block";
                    mybutton2.style.display = "block";
                } else {
                    mybutton.style.display = "none";
                    mybutton2.style.display = "none";
                }
            }
        }
        else {
            const mybutton = document.getElementById("myBtn");
            window.onscroll = function () { scrollFunction() };

            function scrollFunction() {
                if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
                    mybutton.style.display = "block";
                } else {
                    mybutton.style.display = "none";
                }
            }
        }

    })
    function topFunction() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    function topFunction2() {
        document.querySelector(".loggedIn-card").scrollIntoView({ behavior: 'smooth', 'block': 'center' })
    }
    if (loggedIn) {
        return (
            <>
                <div className="cardlist">
                    {
                        users.map((e, i) => {
                            if (!loggedIn) {
                                return <Card key={i} name={e.name} display_name={e.display_name} img_url={e.img_url} bio={e.bio} id={e.id} clicks={e.clicks} rank={i} badge={e.badge} />

                            }
                            else {
                                if (e.display_name != user.display_name) {
                                    return <Card key={i} name={e.name} display_name={e.display_name} img_url={e.img_url} bio={e.bio} id={e.id} clicks={e.clicks} rank={i} badge={e.badge} />
                                }
                                else {
                                    return <Card user={user} users={users} setUser={setUser} setUsers={setUsers} click={clicks} setClick={setClicks} key={i} login={true} name={e.name} display_name={e.display_name} img_url={e.img_url} bio={e.bio} id={e.id} clicks={e.clicks} rank={i} badge={e.badge} />

                                }
                            }

                        })
                    }
                </div>
                <button onClick={topFunction} id="myBtn" title="Go to top">Top</button>
                <button onClick={topFunction2} id="myBtn2" title="Go to myCard">My Card</button>
            </>
        )
    }
    else {

        return (
            <>
                <div className="cardlist">
                    {
                        users.map((e, i) => {
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
                <button onClick={topFunction} id="myBtn" title="Go to top">Top</button>
            </>
        )
    }

}
export default CardList;
