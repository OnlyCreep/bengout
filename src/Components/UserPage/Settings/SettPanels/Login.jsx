import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BiError } from "react-icons/bi";
import { Context } from "../../../Context";

export default function Login() {
  const {login, setLogin, setPass, pass} = useContext(Context)
  const [newLogin, setNew] = useState("");
  const [err, setErr] = useState("");
  function verify() {
    axios
      .post("http://localhost:4000/loginVerify", {
        login: newLogin,
      })
      .then((res) => {
        if (res.data) {
          setErr("");
          upload();
        } else setErr("Пользователь с таким логином уже существует");
      });
  }
  function newCookie() {
      axios
      .post("http://localhost:4000/login", {
        login: newLogin,
        pass: pass,
      })
      .then((res)=>{
        document.cookie = `session=${res.data}; path=/`
      })
  }
  function upload() {
    axios.post("http://localhost:4000/changeLogin", {
      id: document.cookie.split("=")[1],
      newLogin: newLogin,
    })
    .then(()=>setLogin(newLogin))
    .then(
      newCookie
    )
  }
  useEffect(() => {
    if (document.cookie.split("=")[1]) {
      axios
        .post("http://localhost:4000/getUser", {
          id: document.cookie.split("=")[1],
        })
        .then((res) => {
          setLogin(res.data[0].login);
          setPass(res.data[0].pass)
        });
    } else document.location.href = "/login";
  }, [null]);
  return (
    <>
      <section className="settings">
        <h4>Логин</h4>
        <div className="settings-block">
          <h4>Текущий логин: {login}</h4>
          <form className="settings-block-login">
            <label
              className="settings-block-login-err_pop"
              style={{ display: `${err ? "table" : "none"}` }}
            >
              <BiError /> Ошибка <br /> {err}
            </label>
            <input
              type="text"
              placeholder="Новый логин"
              className="settings-block-login-inpt"
              onChange={(e) => setNew(e.target.value)}
            />
            <button
              type="button"
              className="settings-block-login-but"
              onClick={verify}
            >
              Подтвердить
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
