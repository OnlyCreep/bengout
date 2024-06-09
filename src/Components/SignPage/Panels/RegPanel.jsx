import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function RegPanel() {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [loginValid, setLoginValid] = useState("");
  const [passValid, setPassValid] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [loginValidVer, setLoginValidVer] = useState(false);
  const [passValidVer, setPassValidVer] = useState(false);
  const [emailValidVer, setEmailValidVer] = useState(false);

  const upload = () => {
    axios
      .post("http://localhost:4000/create", {
        login: login,
        pass: pass,
        email: email,
      })
      .then((res) => {
        document.cookie = `session=${res.data}`;
        document.location.href = "/user";
      });
  };

  function verifySqlEmail(verify) {
    if (!verify) {
      setEmailValid("Такой email уже существует");
      setEmailValidVer(false);
      setEmail("");
      console.log("scas");
    } else {
      login_valid();
      console.log(!verify);
      setEmailValid("");

      setEmailValidVer(false);
    }
  }

  function login_valid() {
    axios
      .post("http://localhost:4000/loginValid", { login: login })
      .then((res) => {
        if (res.data) {
          console.log("scas");
          upload();
        } else {
          console.log("scas");
          setLoginValid("Пользователь с таким логином уже существует");
          setLogin("");
          setLoginValidVer(false);
        }
      });
  }

  useEffect(() => {
    if (loginValidVer && passValidVer && emailValidVer) {
      validSqlEmail(email);
    }
  }, [loginValidVer, passValidVer, emailValidVer]);

  function cyrillicTest(str) {
    return /[а-яА-ЯЁё]/.test(str);
  }

  function validSqlEmail(email) {
    axios
      .post("http://localhost:4000/emailValid", {
        email: email,
      })
      .then((res) => {
        verifySqlEmail(res.data == "true");
      });
  }

  const valid = () => {
    if (cyrillicTest(login)) {
      setLoginValid("Логин должен содержать только латинские буквы");
      setLoginValidVer(false);
      setLogin("");
    } else if (login == "") {
      setLoginValid("Введите логин");
      setLoginValidVer(false);
      setLogin("");
    } else if (login.length < 2) {
      setLoginValid("Логин слишком короткий");
      setLoginValidVer(false);
      setLogin("");
    } else if (login.length > 20) {
      setLoginValid("Логин слишком длинный");
      setLoginValidVer(false);
      setLogin("");
    } else if (true) {
      setLoginValid("");
      setLoginValidVer(true);
    }

    if (pass !== pass1) {
      setPassValid("Пароли не совпадают");
      setPassValidVer(false);
      setPass("");
      setPass1("");
    } else if (pass == "") {
      setPassValid("Введите пароль");
      setPassValidVer(false);
      setPass("");
      setPass1("");
    } else if (pass.length < 8) {
      setPassValid("Пароль слишком короткий");
      setPassValidVer(false);
      setPass("");
      setPass1("");
    } else if (pass.length > 20) {
      setPassValid("Пароль слишком длинный");
      setPassValidVer(false);
      setPass("");
      setPass1("");
    } else {
      setPassValid("");
      setPassValidVer(true);
    }

    if (email == "") {
      setEmailValid("Введите email");
      setEmailValidVer(false);
      setEmail("");
    } else if (!email.includes("@") || !email.includes(".")) {
      setEmailValid("Неверный email");
      setEmailValidVer(false);
      setEmail("");
    } else if (email.length < 4) {
      setEmailValid("Неверный email");
      setEmailValidVer(false);
      setEmail("");
    } else {
      setEmailValid("");
      setEmailValidVer(true);
    }
  };
  return (
    <form className="signSection-sign_container-signElem-panel signSection-sign_container-signElem-regPanel">
      <div className="signSection-sign_container-signElem-panel-validVer">
        <label className="signSection-sign_container-signElem-panel-validVer-label">
          {loginValid}
        </label>
        <input
          placeholder=""
          className="signSection-sign_container-signElem-panel-inpt-reg"
          style={{ border: `${loginValid ? "1px solid red" : ""}` }}
          onChange={(e) => {
            setLogin(e.target.value);
            setLoginValid("");
          }}
          onFocus={() => setLoginValid("")}
          name="login"
          autoComplete="off"
          type="text"
          value={login}
        />
        <label
          className={`signSection-sign_container-signElem-panel-inpt-animLabel reg ${
            login ? "active" : ""
          }`}
        >
          Логин
        </label>
      </div>
      <div className="signSection-sign_container-signElem-panel-validVer">
        <label className="signSection-sign_container-signElem-panel-validVer-label">
          {emailValid}
        </label>
        <input
          placeholder=""
          className="signSection-sign_container-signElem-panel-inpt-reg"
          style={{ border: `${emailValid ? "1px solid red" : ""}` }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onFocus={() => setEmailValid("")}
          value={email}
          name="email"
          autoComplete="off"
          type="text"
        />
        <label
          className={`signSection-sign_container-signElem-panel-inpt-animLabel reg ${
            email ? "active" : ""
          }`}
        >
          Email
        </label>
      </div>
      <div className="signSection-sign_container-signElem-panel-validVer">
        <label className="signSection-sign_container-signElem-panel-validVer-label">
          {passValid}
        </label>
        <input
          placeholder=""
          className="signSection-sign_container-signElem-panel-inpt-reg"
          style={{ border: `${passValid ? "1px solid red" : ""}` }}
          onChange={(e) => {
            setPass(e.target.value);
          }}
          onFocus={() => setPassValid("")}
          value={pass}
          name="pass"
          autoComplete="off"
          type="text"
        />
        <label
          className={`signSection-sign_container-signElem-panel-inpt-animLabel reg ${
            pass ? "active" : ""
          }`}
        >
          Пароль
        </label>
      </div>
      <div className="signSection-sign_container-signElem-panel-validVer">
        <label className="signSection-sign_container-signElem-panel-validVer-label"></label>
        <input
          placeholder=""
          className="signSection-sign_container-signElem-panel-inpt-reg"
          style={{ border: `${passValid ? "1px solid red" : ""}` }}
          onChange={(e) => {
            setPass1(e.target.value);
          }}
          onFocus={() => setPassValid("")}
          value={pass1}
          name="pass"
          autoComplete="off"
          type="text"
        />
        <label
          className={`signSection-sign_container-signElem-panel-inpt-animLabel reg ${
            pass1 ? "active" : ""
          }`}
        >
          Повтор пароля
        </label>
      </div>
      <button
        type="button"
        className="signSection-sign_container-signElem-panel-butt-reg"
        onClick={valid}
      >
        Создать аккаунт
      </button>
    </form>
  );
}
