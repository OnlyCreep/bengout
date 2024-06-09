import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { BiUpload } from "react-icons/bi";
import { Context } from "../../../Context";

export default function Avatar() {
  const { login, avatar, setAvatar } = useContext(Context);
  const [newAvatar, setNewAv] = useState("");
  const [file, setFile] = useState();
  const [uploadStatus, setStatus] = useState("");
  const [fileErr, setFileErr] = useState("");
  const uploadSet = useRef(null);
  const uploadSetFile = useRef(null);
  const urlInpt = useRef(null);
  document.title = `Настройки | ${login}`;

  useEffect(() => {
    if (uploadSet.current)
      uploadSetFile.current.style.paddingLeft = `${uploadSet.current.clientWidth}px`;
  }, [file]);

  useEffect(() => {
    if (document.cookie.split("=")[1]) {
      axios
        .post("http://localhost:4000/getUser", {
          id: document.cookie.split("=")[1],
        })
        .then((res) => {
          setAvatar(res.data[0].avatarUrl);
        });
    } else document.location.href = "/login";
  }, [null]);

  useEffect(() => {
    setTimeout(() => {
      setStatus("");
    }, 8000);
  }, [uploadStatus]);

  useEffect(() => {
    setTimeout(() => {
      setFileErr("");
    }, 8000);
  }, [fileErr]);

  function uploadFile() {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", document.cookie.split("=")[1]);
    axios
      .post("http://localhost:4000/updateAvatarFile", formData)
      .then(() => {
        setStatus("Аватар сохранён");
      })
      .catch((e) => console.log(e));
  }

  function uploadUrl() {
    axios
      .post("http://localhost:4000/updateAvatarUrl", {
        id: document.cookie.split("=")[1],
        url: newAvatar,
      })
      .catch((e) => console.log(e));
  }

  function verify() {
    if (file) {
      if (typeof file == "object") uploadFile();
      else uploadUrl();
    } else setFileErr("Файл не выбран");
  }
  return (
    <section className="settings">
      <h4>Аватар профиля</h4>
      <div className="settings-block">
        <div
          className="settings-avatarBlock-avatar"
          style={{
            "--avatar": `url(${
              avatar.includes("blob") || avatar.includes("http")
                ? avatar
                : "/images/" + avatar
            })`,
          }}
        ></div>
        <div className="settings-avatarBlock-set">
          <div>
            <label style={{ paddingRight: "10px" }}>URL:</label>
            <input className="settings-avatarBlock-set-url" ref={urlInpt} />
            <button
              onClick={() => {
                if (
                  urlInpt.current.value &&
                  !urlInpt.current.value.includes("http")
                ) {
                  setNewAv(urlInpt.current.value);
                  setAvatar(newAvatar);
                  setFile(newAvatar);
                }
              }}
              className="settings-avatarBlock-set-url-but"
            >
              Загрузить
            </button>
          </div>
          <div className="settings-avatarBlock-set-upload-pos">
            <label
              className="settings-avatarBlock-set-upload_label"
              for="file-upload"
              ref={uploadSet}
            >
              {file ? file.name || newAvatar : "Загрузить файл"}{" "}
              <BiUpload style={{ fontSize: "1.8rem" }} />
            </label>
            <input
              type="file"
              className="settings-avatarBlock-set-upload"
              id="imgInp"
              ref={uploadSetFile}
              onChange={(e) => {
                setFile(e.target.files[0]);
                setAvatar(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>
        </div>
        <button
          className="settings-avatarBlock-saveBut-but"
          onClick={() => {
            setFileErr("");
            setStatus("");
            verify();
          }}
        >
          Сохранить
        </button>
        <label
          className="settings-avatarBlock-saveBut-label"
          style={{ color: `${fileErr ? "red" : "rgb(0, 170, 0)"}` }}
        >
          {uploadStatus || fileErr}
        </label>
      </div>
    </section>
  );
}
