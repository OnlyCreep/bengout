import React, { useContext, useEffect, useState } from "react";
import "./UserStyles.css";
import { Context } from "../Context";
import axios from "axios";
import { SlSettings } from "react-icons/sl";
import { BiDoorOpen, BiHeart } from "react-icons/bi";

export default function UserPage() {
  const { isAuth } = useContext(Context);
  const [isLoaded, setDone] = useState(false);
  const { avatar, setAvatar, login, setLogin, email, setEmail } =
    useContext(Context);
  document.title = `Личный кабинет | ${login}`;
  useEffect(() => {
    if (!isAuth) document.location.href = "/login";
  }, [isAuth]);
  useEffect(() => {
    axios
      .post("http://localhost:4000/getUser", {
        id: document.cookie.split("=")[1],
      })
      .then((res) => {
        setAvatar(res.data[0].avatarUrl);
        setLogin(res.data[0].login);
        setEmail(res.data[0].email);
      })
      .then(() => setDone(true));
  }, [null]);

  function leaveAccount() {
    document.cookie = "session=; path=/; expires=-1";
    document.location.href = "/";
  }
  return (
    <>
      {isLoaded && (
        <section className="userPage">
          <div style={{ display: "flex" }}>
            <div
              style={{
                "--img": `url(${
                  avatar.includes("blob") || avatar.includes("http")
                    ? avatar
                    : "/images/" + avatar
                })`,
              }}
              className="userPage-avatar"
            ></div>
            <div className="userPage-globalInfo">
              <h1 className="userPage-globalInfo-login">{login}</h1>
              <h5 className="userPage-globalInfo-login">{email}</h5>
            </div>
          </div>
          <a
            className="userPage-settBut"
            href="user/inlike"
            style={{ color: "green" }}
          >
            <BiHeart />В избранном
          </a>
          <a className="userPage-settBut" href="user/settings">
            <SlSettings />
            Настройки
          </a>
          <a className="userPage-leaveBut" href="login" onClick={leaveAccount}>
            <BiDoorOpen />
            Выйти
          </a>
        </section>
      )}
    </>
  );
}
