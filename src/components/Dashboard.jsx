import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard({ user, usernames, setUsers, setUser, changeLogin }) {
  const navigate = useNavigate()
  function updateBio() {
    const bio = document.getElementById("updatebioInput").value;
    navigate('/loading')
    fetch(`http://localhost:3002/updatebio/${user.display_name}/${user.password}/${bio}`)
      .then(response => response.json())
      .then(result => {
        navigate('/profile')
        setUser(prevState => ({
          ...prevState,
          "bio": bio
        }));
      })

  }
  function updateUsername() {
    const username = document.getElementById("updateusernameInput").value;
    if (username == "") {
      alert("enter a username")
    }
    else if (username in usernames) {
      alert("username already exists!")
    }
    else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "display_name": user.display_name,
        "password": user.password,
        "new_display_name": username
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      navigate('/loading')
      fetch("http://localhost:3002/changeusername", requestOptions)
        .then(response => response.json())
        .then(result => {
          navigate('/profile')
          setUser(prevState => ({
            ...prevState,
            "display_name": username
          }));
        })
        .catch(error => console.log('error', error));
    }
  }

  function changePassword() {
    const password = document.getElementById("changepasswordInput").value;
    if (password == "") {
      alert("enter a password")
    }
    else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "display_name": user.display_name,
        "password": user.password,
        "newpassword": password
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      navigate('/loading')
      fetch("http://localhost:3002/changepassword", requestOptions)
        .then(response => response.json())
        .then(result => {
          localStorage.setItem("password", password)
          navigate('/profile')
          setUser(prevState => ({
            ...prevState,
            "password": password
          }));
        })
        .catch(error => console.log('error', error));
    }
  }
  function changeDp() {
    const dp = document.getElementById("changedp")
    var img_url = ""
    var formdata = new FormData();
    formdata.append("key", "7e60570fc00f7495c89ca030e9cf8dd6");
    formdata.append("image", dp.files[0], user.display_name);

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
          "display_name": user.display_name,
          "password": user.password,
          "img_url": img_url
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        fetch("http://localhost:3002/changedp", requestOptions)
          .then(response => response.text())
          .then(result => {
            navigate('/profile')
            setUser(prevState => ({
              ...prevState,
              "img_url": img_url
            }));
          })
          .catch(error => console.log('error', error));

      })
      .catch(error => console.log('error', error));
  }

  function changeTheme() {
    const theme = document.getElementById("changeThemeInput").value;
    navigate('/loading')
    fetch(`http://localhost:3002/changetheme/${user.display_name}/${user.password}/${theme}`)
      .then(response => response.json())
      .then(result => {
        navigate('/profile')
        setUser(prevState => ({
          ...prevState,
          "theme": theme
        }));
      })

  }

  function deleteUser() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "display_name": user.display_name,
      "password": user.password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3002/delete", requestOptions)
      .then(response => response.text())
      .then(result => {
        localStorage.clear()
        navigate('/')
        changeLogin(false)
        setUser()
      })
      .catch(error => console.log('error', error));
  }
  return (
    <div>
      <div className="profile">
        {user.display_name}
        <br />
        {user.bio}
        <br />
        <img src={user.img_url} alt="dp" />
      </div>
      <div className="form">
        <div className="changeBio">
          <input type="text" id="updatebioInput" />
          <button onClick={updateBio}>update bio</button>
        </div>
        <div className="changeUsername">
          <input type="text" id="updateusernameInput" />
          <button onClick={updateUsername}>update username</button>
        </div>
        <div className="changePassword">
          <input type="password" id="changepasswordInput" />
          <button onClick={changePassword}>change password</button>
        </div>
        <div className="changeDp">
          <input type="file" name="pic" id="changedp" />
          <button onClick={changeDp}>upload</button>
        </div>
        <div className="changeTheme">
          <select name="themes" id="changeThemeInput">
            <option value="A">Red</option>
            <option value="B">Blue</option>
            <option value="C">Green</option>
            <option value="D">Black</option>
          </select>
          <button onClick={changeTheme}>change</button>
        </div>
      </div>
      <div className="delete">
        <button onClick={deleteUser}>Delete Account</button>
      </div>
    </div>
  )
}

export default Dashboard