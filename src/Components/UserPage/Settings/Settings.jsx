import React, { useEffect, useState } from "react";
import "./SettStyles.css";
import axios from "axios";
import { BiUpload } from "react-icons/bi";

export default function Settings() {
  const [avatar, setAvatar] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [newAvatar, setNewAv] = useState("");
  const [file, setFile] = useState();

  useEffect(() => {
    if (document.cookie.split("=")[1]) {
      axios
        .post("http://localhost:4000/getUser", {
          id: document.cookie.split("=")[1],
        })
        .then((res) => {
          setAvatar(res.data[0].avatarUrl);
          setLogin(res.data[0].login);
          setEmail(res.data[0].email);
        });
    } else document.location.href = "/login";
  }, [null]);

  function upload() {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", document.cookie.split("=")[1]);
    axios
      .post("http://localhost:4000/updateAvatar", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  }
  return (
    <section className="settings">
      <h4>Аватар профиля</h4>
      <div className="settings-avatarBlock">
        <div
          className="settings-avatarBlock-avatar"
          style={{ "--avatar": `url(images/${avatar})` }}
        ></div>
        <div className="settings-avatarBlock-set">
          <div>
            <label>URL:</label>
            <input
              value={newAvatar}
              className="settings-avatarBlock-set-url"
              onChange={(e) => setNewAv(e.target.value)}
            />
            <button
              onClick={() => setAvatar(newAvatar)}
              className="settings-avatarBlock-set-url-but"
            >
              Загрузить
            </button>
          </div>
          <div className="settings-avatarBlock-set-upload-pos">
            <label
              class="settings-avatarBlock-set-upload_label"
              for="file-upload"
            >
              Загрузить файл <BiUpload style={{ fontSize: "1.8rem" }} />
            </label>
            <input
              type="file"
              className="settings-avatarBlock-set-upload"
              id="imgInp"
              onChange={(e) => {
                setFile(e.target.files[0]);
                console.log(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <button className="settings-avatarBlock-saveBut" onClick={upload}>
          Сохранить
        </button>
      </div>
    </section>
  );
}
