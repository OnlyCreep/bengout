import React, { useContext, useEffect, useRef, useState } from "react";
import "./MySearch.css";
import { BiSearch } from "react-icons/bi";
import Rating from "./Rating";
import YearChange from "./YearModal/YearChange";
import { Context } from "../Context";
import GenresVars from "./GenresInfo/GenresVars";
import { IoIosHeart } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ModalStyles.css";

export default function Search() {
  document.title = "Поиск";

  const { setUrl, isAuth } = useContext(Context);

  const [realYear, setRealYear] = useState("Не указан");
  const [film, setFilms] = useState([]);
  const [rateStars, setRate] = useState(0);
  const [genresSel, setSelect] = useState([]);
  const [inlike, setInLike] = useState([]);

  const onKeyEnter = (e) => {
    var key = e.which;
    if (key === 13) {
      searchFilter();
    }
  };

  const inputName = useRef(null);
  const dialog = useRef(null);
  const modal = useRef(null);

  useEffect(() => {
    fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=2`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": "bfea6215-8e13-4034-aca3-8ba2c6f06f4b",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => setFilms(json.items))
      .catch((err) => console.log(err));
  }, [null]);

  useEffect(() => {
    if (isAuth) {
      axios
        .post("http://localhost:4000/getInLike", {
          id: document.cookie.split("=")[1],
        })
        .then((res) => {
          if (res.data != null) {
            setInLike(res.data);
          }
        });
    }
  }, [null]);

  function inLike(id) {
    setInLike([...inlike, id]);
    axios.post("http://localhost:4000/setInLike", {
      id: document.cookie.split("=")[1],
      films: [...inlike, id],
    });
  }

  function inLikeRemove(id) {
    setInLike(inlike.filter((el) => el != id));
    axios.post("http://localhost:4000/setInLike", {
      id: document.cookie.split("=")[1],
      films: inlike.filter((el) => el != id),
    });
  }

  function searchFilter() {
    if (
      inputName.current.value != "" ||
      realYear != "Не указан" ||
      genresSel != "" ||
      rateStars != 0
    ) {
      inputName = encodeURI(inputName.current.value);
      fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=${
          genresSel != "" ? genresSel[0].id : ""
        }&order=RATING&type=ALL&ratingFrom=${rateStars}&ratingTo=10&yearFrom=${
          realYear != "Не указан" ? realYear : ""
        }&yearTo=${
          realYear != "Не указан" ? realYear : ""
        }&keyword=${inputName}&page=1`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": "bfea6215-8e13-4034-aca3-8ba2c6f06f4b",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((json) =>
          setFilms(
            json.items.filter(
              (el) =>
                el.nameRu != null &&
                el.posterUrl !=
                  "https://kinopoiskapiunofficial.tech/images/posters/kp/892.jpg" &&
                el.posterUrl !=
                  "https://kinopoiskapiunofficial.tech/images/posters/kp/904.jpg"
            )
          )
        )
        .catch((err) => console.log(err));
    } else {
      fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=2`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": "bfea6215-8e13-4034-aca3-8ba2c6f06f4b",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((json) => setFilms(json.items))
        .catch((err) => console.log(err));
    }
  }
  return (
    <Context.Provider
      value={{
        realYear,
        setRealYear,
        rateStars,
        setRate,
        genresSel,
        setSelect,
      }}
    >
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
      <section className="searchbar">
        <aside className="searchbar-sidebar">
          <ul className="searchbar-sidebar-opps">
            <li className="searchbar-sidebar-opps-stars">
              Рейтинг
              <br />
              <div className="searchbar-sidebar-opps-stars-star">
                <Rating />
              </div>
            </li>
            <li className="searchbar-sidebar-opps-year">
              Год выхода
              <br />
              <YearChange />
            </li>
            <li className="searchbar-sidebar-opps-categ">
              Жанры
              <br />
              <GenresVars />
            </li>
            <li
              className="searchbar-sidebar-opps-drop"
              onClick={() => {
                setRealYear("Не указан");
                setRate(0);
                setSelect([]);
              }}
            >
              Сбросить
            </li>
          </ul>
        </aside>
        <main className="searchbar-search">
          <input
            onKeyDown={(e) => onKeyEnter(e)}
            type="text"
            placeholder="Название фильма сериала"
            className="searchbar-search-input"
            ref={inputName}
          />
          <button className="searchbar-search-button" onClick={searchFilter}>
            <BiSearch className="searchbar-search-button-icon" />
          </button>
          <article className="films">
            {film.map((el) => (
              <div className="films-card" key={el.kinopoiskId}>
                <img src={el.posterUrl} alt="" className="films-card-img" />
                <div className="film-card-direct">
                  <div className="film-card-info">
                    <span className="films-card-name">{el.nameRu}</span>
                    <span className="films-card-genres">
                      {el.genres.map((ret) => ret.genre + " ")}
                    </span>
                    <span className="films-card-genres">
                      Год выхода {el.year}
                    </span>
                    {el.ratingKinopoisk != null && (
                      <span className="films-card-genres">
                        Рейтинг {el.ratingKinopoisk}
                      </span>
                    )}
                  </div>
                  <div className="films-card-buttons">
                    {!inlike.includes(el.kinopoiskId) ? (
                      <div
                        className="films-card-buttons-like"
                        onClick={() => {
                          if (!isAuth) {
                            if (dialog.current) {
                              dialog.current.style.transform = "translate(-50%, -50%) scale(1)";
                              modal.current.style.backgroundColor =
                                "rgba(0, 0, 0, 0.4)";
                              modal.current.style.zIndex = "99";
                              document.body.style.overflow = "hidden";
                            }
                          } else inLike(el.kinopoiskId);
                        }}
                      >
                        <IoIosHeart />
                      </div>
                    ) : (
                      <div
                        className="films-card-buttons-like"
                        style={{
                          backgroundColor: "white",
                          color: "red",
                          border: "1px solid white",
                        }}
                        onClick={() => {
                          inLikeRemove(el.kinopoiskId);
                        }}
                      >
                        <IoIosHeart />
                      </div>
                    )}
                    <Link
                      className="films-card-buttons-viewLink"
                      to={`/film:${el.kinopoiskId}`}
                      onClick={() => {
                        setUrl(el.kinopoiskId);
                      }}
                    >
                      <div className="films-card-buttons-view">Смотреть</div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </article>
        </main>
      </section>
    </Context.Provider>
  );
}
