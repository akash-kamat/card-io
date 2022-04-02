import React from 'react'
import {useNavigate} from 'react-router-dom'

function Signup({usernames}) {

  const navigate = useNavigate()
  
  function registerClick(usernames){
    const fields = document.getElementsByTagName("input")
    const name = fields[0].value
    const display_name = fields[1].value
    const password = fields[4].value
    const bio = fields[2].value
    var img_url = ""

    if (usernames.includes(display_name)) {
      alert("Username already exists!")
    }
    else {
      var formdata = new FormData();
      formdata.append("key", "7e60570fc00f7495c89ca030e9cf8dd6");
      formdata.append("image", fields[3].files[0], display_name);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      navigate('/loading')
      fetch("https://api.imgbb.com/1/upload", requestOptions)
        .then(response => response.json())
        .then(result => {
          img_url = result.data.display_url;
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            "name": name,
            "display_name": display_name,
            "password": password,
            "bio": bio,
            "img_url": img_url
          });

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          fetch("http://localhost:3002/register", requestOptions)
            .then(response => response.text())
            .then(result => navigate('/'))
            .catch(error => console.log('error', error));

        })
        .catch(error => console.log('error', error));

    }



  }
  return (
      <div>
        <div className="box">
          <input type="text" name="name" id="name" placeholder='Name' />
          <input type="text" name="username" id="username" placeholder='username' />
          <input type="text" name="bio" id="bio" placeholder='bio' />
          <input type="file" name="dp" id="dp" />
          <input type="password" name="password" id="password" placeholder='password' />
          <button id='register' onClick={()=>registerClick(usernames)}>Register</button>
        </div>
      </div>
  )
}

export default Signup