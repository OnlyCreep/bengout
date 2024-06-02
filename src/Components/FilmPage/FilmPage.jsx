import React, { useEffect, useState } from "react";
import "./FilmPageStyles.css";
import KinoboxPlayer from "./KinoboxPlayer";

export default function FilmPage() {
  const urlAdress = document.location.pathname.split(":")[1];
  const [film, setFilm] = useState([]);
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
  let genrs = "";
  for (let i in film.genres) {
    genrs += `${film.genres[i].genre}${
      i++ != film.genres.length - 1 ? "," : ""
    } `;
  }
  return (
    <section className="filmpage">
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
    </section>
  );
}
