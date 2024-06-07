import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BiError } from "react-icons/bi";
import { Context } from "../../../Context";

export default function LoginEmail() {
  const { email, setEmail } = useContext(Context);
  const [newEmail, setNewEmail] = useState("");
  const [errEmail, setErrEmail] = useState("");
  useEffect(() => {
    if (document.cookie.split("=")[1]) {
      axios
        .post("http://localhost:4000/getUser", {
          id: document.cookie.split("=")[1],
        })
        .then((res) => {
          setEmail(res.data[0].email);
        });
    } else document.location.href = "/login";
  }, [null]);
  function verifyEmail() {
    axios
      .post("http://localhost:4000/emailVerify", {
        email: newEmail,
      })
      .then((res) => {
        if (res.data) {
          axios
            .post("http://localhost:4000/changeEmail", {
              id: document.cookie.split("=")[1],
              newEmail: newEmail,
            })
            .then(() => setEmail(newEmail))
            .then(newCookie);
        } else setErrEmail("Пользователь с таким email уже существует");
      });
  }

  const { login, setLogin, setPass, pass } = useContext(Context);
  const [newLogin, setNewLogin] = useState("");
  const [errLogin, setErrLogin] = useState("");
  function verify() {
    axios
      .post("http://localhost:4000/loginVerify", {
        login: newLogin,
      })
      .then((res) => {
        if (res.data) {
          setErrLogin("");
          upload();
        } else setErrLogin("Пользователь с таким логином уже существует");
      });
  }
  function newCookie() {
    axios
      .post("http://localhost:4000/login", {
        login: newLogin||login,
        pass: pass,
      })
      .then((res) => {
        document.cookie = `session=${res.data}; path=/`;
      });
  }
  function upload() {
    axios
      .post("http://localhost:4000/changeLogin", {
        id: document.cookie.split("=")[1],
        newLogin: newLogin,
      })
      .then(() => setLogin(newLogin))
      .then(newCookie);
  }
  useEffect(() => {
    if (document.cookie.split("=")[1]) {
      axios
        .post("http://localhost:4000/getUser", {
          id: document.cookie.split("=")[1],
        })
        .then((res) => {
          setLogin(res.data[0].login);
          setPass(res.data[0].pass);
        });
    } else document.location.href = "/login";
  }, [null]);
  return (
    <>
      <section className="settings">
        <h4>Логин и email</h4>
        <div className="settings-block">
          <h4>Текущий логин: {login}</h4>
          <form className="settings-block-login">
            <label
              className="settings-block-login-err_pop"
              style={{ display: `${errLogin ? "table" : "none"}` }}
            >
              <BiError /> Ошибка <br /> {errLogin}
            </label>
            <input
              type="text"
              placeholder="Новый логин"
              className="settings-block-login-inpt"
              onChange={(e) => {
                setErrLogin("");
                setNewLogin(e.target.value);
              }}
            />
            <button
              type="button"
              className="settings-block-login-but"
              onClick={() => {
                if (newLogin) verify();
                else setErrLogin("Поле пустое");
              }}
            >
              Подтвердить
            </button>
          </form>
        </div>
        <div className="settings-block">
          <h4>Текущий email: {email}</h4>
          <form className="settings-block-login">
            <label
              className="settings-block-login-err_pop"
              style={{ display: `${errEmail ? "table" : "none"}` }}
            >
              <BiError /> Ошибка <br /> {errEmail}
            </label>
            <input
              type="text"
              placeholder="Новый email"
              className="settings-block-login-inpt"
              onChange={(e) => {
                setNewEmail(e.target.value);
                setErrEmail("");
              }}
            />
            <button
              type="button"
              className="settings-block-login-but"
              onClick={() => {
                if (newEmail) {
                  if (!(newEmail.includes(".")) || !(newEmail.includes("@"))) {
                    setErrEmail("Email неверный");
                  }
                  else verifyEmail()
                } else setErrEmail("Поле пустое");
              }}
            >
              Подтвердить
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
