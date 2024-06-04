import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Login() {
  const [login, setLogin] = useState("");
  useEffect(() => {
    if (document.cookie.split("=")[1]) {
      axios
        .post("http://localhost:4000/getUser", {
          id: document.cookie.split("=")[1],
        })
        .then((res) => {
          setLogin(res.data[0].login);
        });
    } else document.location.href = "/login";
  }, [null]);
  return (
    <>
      <section className="LogNEmail">
        <h4>Логин</h4>
        <main className="LogNEmail-main"></main>
      </section>
    </>
  );
}
