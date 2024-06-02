import React, { useContext, useEffect, useState } from "react";
import "./UserStyles.css";
import { Context } from "../Context";
import axios from "axios";

export default function UserPage() {
  const { isAuth } = useContext(Context);
  const [isLoaded, setDone] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (!isAuth) document.location.href = "/login";
  }, [isAuth]);
  useEffect(() => {
    axios
      .post("http://localhost:4000/getUser", {
        id: document.cookie.split("=")[1],
      })
      .then((res) => {
        setAvatar(res.data[0].avatarUrl)
        setLogin(res.data[0].login)
        setEmail(res.data[0].email)
      })
      .then(() => setDone(true));
  }, [null]);

  function leaveAccount() {
    document.cookie = "session=";
    document.location.href = "/";
  }
  return (
    <>
      {isLoaded && (
        <section className="userPage">
          <img src={avatar} alt="" className="userPage-avatar"/>
          <div className="userPage-globalInfo">
          <h1 className="userPage-globalInfo-login">{login}</h1>
          <h5 className="userPage-globalInfo-login">{email}</h5>
          </div>
        </section>
      )}
    </>
  );
}
