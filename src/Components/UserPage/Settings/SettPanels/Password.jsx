import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../Context";
import { BiError } from "react-icons/bi";

export default function Password() {
  const { login, pass, setPass, setLogin } = useContext(Context);
  const [err, setErr] = useState("");
  const [thisPass, setTPass] = useState("");
  const [newPass, setNew] = useState("");
  document.title = `Настройки | ${login}`;
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
  function passSet() {
    axios
      .post("http://localhost:4000/verifyPassword", {
        login: login,
        pass: thisPass,
      })
      .then((res) => {
        if (res.data) {
          axios
            .post("http://localhost:4000/changePassword", {
              id: document.cookie.split("=")[1],
              pass: newPass,
            })
            .then(() => (document.location.href = "/login"));
        } else setErr("Текущий пароль неверный");
      });
  }
  return (
    <section className="settings">
      <h4>Пароль</h4>
      <div className="settings-block">
        <h4>Изменить пароль</h4>
        <form className="settings-block-login">
          <label
            className="settings-block-login-err_pop"
            style={{ display: `${err ? "table" : "none"}` }}
          >
            <BiError /> Ошибка <br /> {err}
          </label>
          <input
            type="text"
            placeholder="Текущий пароль"
            className="settings-block-login-inpt"
            onChange={(e) => {
              setErr("");
              setTPass(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Новый пароль"
            className="settings-block-login-inpt"
            onChange={(e) => {
              setErr("");
              setNew(e.target.value);
            }}
          />
          <button
            type="button"
            className="settings-block-login-but"
            onClick={() => {
              if (thisPass == newPass)
                setErr("Текущий пароль и новый одинаковы");
              else if (newPass.length < 4)
                setErr("Новый пароль слишком короткий");
              else if (newPass.length > 20)
                setErr("Новый пароль слишком длинный");
              else passSet();
            }}
          >
            Подтвердить
          </button>
        </form>
      </div>
    </section>
  );
}
