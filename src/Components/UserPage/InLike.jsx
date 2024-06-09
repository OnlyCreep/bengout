import React, { useContext, useEffect, useState } from "react";
import "./InLikeStyles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../Context";

export default function InLike() {
  const [inlike, setInLike] = useState([]);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:4000/getInLike", {
        id: document.cookie.split("=")[1],
      })
      .then((res) => {
        if (res.data != null) {
          console.log(res.data);
          setInLike(res.data);
          console.log(res.data);
        }
      });
  }, [null]);

  const { login, setUrl, isAuth } = useContext(Context);

  document.title = `Настройки | ${login}`;

  useEffect(() => {
    inlike.map((el) => {
      fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${el}`, {
        method: "GET",
        headers: {
          "X-API-KEY": "ed2b6df7-2bbb-4601-90fb-0afef513796e",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setFilms((prevFilms) => [...prevFilms, json]);
        })
        .catch((err) => console.log(err));
    });
  }, [inlike]);

  return (
    <section>
      <div>
        {films.map((el) => (
          <div className="films-card" key={el.kinopoiskId}>
            <img src={el.posterUrl} alt="" className="films-card-img" />
            <div className="film-card-direct">
              <div className="film-card-info">
                <span className="films-card-name">{el.nameRu}</span>
                <span className="films-card-genres">
                  {el.genres.map((ret) => ret.genre + " ")}
                </span>
                <span className="films-card-genres">Год выхода {el.year}</span>
                {el.ratingKinopoisk != null && (
                  <span className="films-card-genres">
                    Рейтинг {el.ratingKinopoisk}
                  </span>
                )}
              </div>
              <div className="films-card-buttons">
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
      </div>
    </section>
  );
}
