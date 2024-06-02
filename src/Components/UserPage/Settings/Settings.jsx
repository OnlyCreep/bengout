import React, { useEffect, useState } from 'react'
import "./SettStyles.css"
import axios from 'axios';
import { BiUpload } from 'react-icons/bi';

export default function Settings() {
    const [avatar, setAvatar] = useState("");
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if(document.cookie.split("=")[1]){
        axios
          .post("http://localhost:4000/getUser", {
            id: document.cookie.split("=")[1],
          })
          .then((res) => {
            setAvatar(res.data[0].avatarUrl)
            setLogin(res.data[0].login)
            setEmail(res.data[0].email)
          })}
          else
            document.location.href = "/login"
      }, [null]);
  return (
    <section className='settings'>
        <div className='settings-avatarBlock'>
            <div className='settings-avatarBlock-avatar' style={{"--avatar": `url(${avatar})`}}></div>
            <div className='settings-avatarBlock-set'>
                <div className='settings-avatarBlock-set-upload-pos'>
                <label class="settings-avatarBlock-set-upload_label" for="file-upload">Загрузить аватар <BiUpload style={{fontSize: "1.8rem"}}/></label>
                <input type='file' accept='image/*' className='settings-avatarBlock-set-upload' id="imgInp" onChange={(e)=>{
                        setAvatar(URL.createObjectURL(e.target.files[0]))
                    }}/>
                </div>
            </div>
        </div>
    </section>
  )
}
