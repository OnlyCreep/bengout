import React, { useState } from "react";
import axios from "axios";

export default function SignPanel() {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [loginVal, setLoginVal] = useState("");
  const [passVal, setPassVal] = useState("");

  const upload = () => {
    axios
      .post("http://localhost:4000/login", {
        login: login,
        pass: pass,
      })
      .then((res) => {
        if (res.data == "Failed") {
          setPass("")
          setPassVal("Пароль неверный")}
        else if (res.data == "None"){
          setLogin("")
          setLoginVal("Такого пользователя не существует");}
        else {
          document.cookie = `session=${res.data}; path=/`;
          document.location.href = "/user";
        }
      });
  };

  const validInpt = () => {
    if (login == "") setLoginVal("Введите логин");
    else setLoginVal("");
    if (pass == "") setPassVal("Введите пароль");
    else setPassVal("");

    if (login != "" && pass != "") upload();
  };

  return (
    <form className="signSection-sign_container-signElem-panel signSection-sign_container-signElem-signPanel">
      <div className="signSection-sign_container-signElem-panel-validVer">
        <label className="signSection-sign_container-signElem-panel-validVer-label">
          {loginVal}
        </label>
        <input
          placeholder=""
          className="signSection-sign_container-signElem-panel-inpt-sign"
          style={{ border: `${loginVal ? "1px solid red" : ""}` }}
          onChange={(e) => {
            setLogin(e.target.value);
          }}
          onFocus={() => setLoginVal("")}
          value={login}
        />
        <label
          className={`signSection-sign_container-signElem-panel-inpt-animLabel sign ${
            login ? "active" : ""
          }`}
        >
          Логин
        </label>
      </div>{" "}
      <div className="signSection-sign_container-signElem-panel-validVer">
        <label className="signSection-sign_container-signElem-panel-validVer-label">
          {passVal}
        </label>
        <input
          placeholder=""
          className="signSection-sign_container-signElem-panel-inpt-sign"
          style={{ border: `${passVal ? "1px solid red" : ""}` }}
          onChange={(e) => {
            setPass(e.target.value);
          }}
          onFocus={() => setPassVal("")}
          value={pass}
        />
        <label
          className={`signSection-sign_container-signElem-panel-inpt-animLabel sign ${
            pass ? "active" : ""
          }`}
        >
          Пароль
        </label>
      </div>
      <button
        type="button"
        className="signSection-sign_container-signElem-panel-butt-sign"
        onClick={validInpt}
      >
        Войти
      </button>
    </form>
  );
}
