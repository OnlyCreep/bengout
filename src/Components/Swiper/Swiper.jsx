import React, { useEffect, useState } from "react";
import "./MySwiper.css";

export default function Swiper() {
  const [items, setItems] = useState([]);
  let userWidth = window.innerWidth / 7.5;
  let userHeight = window.innerWidth / 5;
  let swiperMarg = 0;
  let swiperMargCount = (userWidth + 60) * 4;
  useEffect(() => {
    fetch("response_1715176709774.json", {
      method: "GET",
      headers: {
        "X-API-KEY": "bfea6215-8e13-4034-aca3-8ba2c6f06f4b",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => setItems(json.items))
      .catch((err) => console.log(err));
  }, [null]);
  return (
    <>
      <section
        className="swiper"
        style={{
          "--gridWidth": `${userWidth + 60}px`,
          "--gridHeight": `${userWidth + 260}px`,
          "--swiperWidth": `${(userWidth + 60) * 5}px`,
        }}
      >
        {items.map((el) => (
          <article
            key={el.kinopoiskId}
            className="swiper-card"
            style={{
              "--elemWidth": `${userWidth}px`,
              "--marginLeft": `${swiperMarg}px`,
            }}
          >
            <img
              src={el.posterUrl}
              style={{
                "--urlPost": `url(${el.posterUrl})`,
                "--poserHeight": `${userHeight}px`,
                "--poserWidth": `${userWidth}px`,
              }}
              className="swiper-card-poster"
            />
            <div className="swiper-card-name">{el.nameRu}</div>
            <div className="swiper-card-info">
              {el.year}, {el.genres.map((gen) => gen.genre + " ")}
            </div>
          </article>
        ))}
        <div className="swiper-arrows">
          <span
            className="swiper-arrows-arrow left"
            style={{ left: "1vh" }}
          ></span>
          <span
            className="swiper-arrows-arrow right"
            style={{ right: "1vw" }}
          ></span>
        </div>
      </section>
    </>
  );
}
