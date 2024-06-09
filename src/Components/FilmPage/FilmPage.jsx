import React, { useContext, useEffect, useRef, useState } from "react";
import "./FilmPageStyles.css";
import KinoboxPlayer from "./KinoboxPlayer";
import { Context } from "../Context";
import axios from "axios";

export default function FilmPage() {
  const urlAdress = document.location.pathname.split(":")[1];
  const [inlike, setInlike] = useState([]);
  const [film, setFilm] = useState([]);
  const { isAuth } = useContext(Context);
  const inlike_pand = useRef(null);
  const dialog = useRef(null);
  const modal = useRef(null);
  useEffect(() => {
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${urlAdress}`, {
      method: "GET",
      headers: {
        "X-API-KEY": "bfea6215-8e13-4034-aca3-8ba2c6f06f4b",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => setFilm(json))
      .catch((err) => console.log(err));
  }, [null]);

  function inLike(id) {
    setInlike([...inlike, id]);
    axios.post("http://localhost:4000/setInLike", {
      id: document.cookie.split("=")[1],
      films: [...inlike, id],
    });
  }

  function inLikeRemove(id) {
    setInlike(inlike.filter((el) => el != id));
    axios.post("http://localhost:4000/setInLike", {
      id: document.cookie.split("=")[1],
      films: inlike.filter((el) => el != id),
    });
  }

  useEffect(() => {
    if (isAuth) {
      axios
        .post("http://localhost:4000/getInLike", {
          id: document.cookie.split("=")[1],
        })
        .then((res) => {
          if (res.data != null) {
            setInlike(res.data);
          }
        });
    }
  }, [null]);

  let genrs = "";
  for (let i in film.genres) {
    genrs += `${film.genres[i].genre}${
      i++ != film.genres.length - 1 ? "," : ""
    } `;
  }
  return (<>
    <dialog
    ref={modal}
    className="dialog_wrapper"
    onClick={() => {
      if (dialog.current) {
        dialog.current.style.transform = "translate(-50%, -50%) scale(0)";
        modal.current.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
        setTimeout(() => {
          if (modal.current) modal.current.style.zIndex = "-1";
        }, 300);
      }
      document.body.style.overflow = "auto";
    }}
  ></dialog>
    <div className="dialog_wrapper-modal" ref={dialog}>
      <div className="dialog_wrapper-modal-logo">
        <div className="dialog_wrapper-modal-logo-bc"></div>
        <h1 className="dialog_wrapper-modal-logo-title">Bengout</h1>
      </div>
      <h3 className="dialog_wrapper-modal-title">Добро пожаловать!</h3>
      <span className="dialog_wrapper-modal-span">
        вы ещё не зарегестрировались на сайте
      </span>
      <div className="dialog_wrapper-modal-butts">

        <button
          className="dialog_wrapper-modal-butts-cancel dialog_wrapper-modal-butts-but"
          onClick={() => {
            if (dialog.current) {
              dialog.current.style.transform = "translate(-50%, -50%) scale(0)";
              modal.current.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
              setTimeout(() => {
                if (modal.current) modal.current.style.zIndex = "-1";
              }, 300);
            }
            document.body.style.overflow = "auto";
          }}
        >
          Отмена
        </button>
        <a className="dialog_wrapper-modal-butts-sign dialog_wrapper-modal-butts-but"
        href="/login">
          Войти
        </a>
      </div>
    </div>
    <section className="filmpage">
      <div className="inlike_overflow">
        <div
          className={`inlike_block ${
            inlike.includes(film.kinopoiskId) ? "active" : ""
          }`}
          ref={inlike_pand}
          onClick={() => {
            if(isAuth){
            if (!inlike.includes(film.kinopoiskId)) {
              if (inlike_pand.current)
                inlike_pand.current.classList.add("active");
              inLike(film.kinopoiskId);
            } else {
              if (inlike_pand.current)
                inlike_pand.current.classList.remove("active");
              inLikeRemove(film.kinopoiskId);
            }}
            else{
              if (dialog.current) {
                dialog.current.style.transform = "translate(-50%, -50%) scale(1)";
                modal.current.style.backgroundColor =
                  "rgba(0, 0, 0, 0.4)";
                modal.current.style.zIndex = "99";
                document.body.style.overflow = "hidden";
              }
            }
          }}
        >
          +
        </div>
      </div>
      <div className="filmpage-info">
        <img src={film.posterUrl} alt="" className="filmpage-img" />
        <div className="filmpage-info-sec">
          <div className="filmpage-rates">
            {film.ratingKinopoisk != null && (
              <div
                className="filmpage-rates-rate filmpage-rates-rate_kp"
                style={{ "--s": 0, "--p": film.ratingKinopoisk * 10 }}
              >
                {film.ratingKinopoisk}
                <br />
                <span className="rateVar">Рейтинг Кинопоиск</span>
              </div>
            )}
            {film.ratingImdb != null && (
              <div
                className="filmpage-rates-rate filmpage-rates-rate_imd"
                style={{ "--s": 0, "--p": film.ratingImdb * 10 }}
              >
                {film.ratingImdb}
                <br />
                <span className="rateVar">Рейтинг Imbd</span>
              </div>
            )}
          </div>
          <h1 className="filmpage-name">
            {film.nameRu}, {film.year}
          </h1>
          <div className="filmpage-description">{film.description}</div>
          <div className="filmpage-genres">Жанры: {genrs}</div>
        </div>
      </div>
      <KinoboxPlayer value={urlAdress} />
    </section></>
  );
}
