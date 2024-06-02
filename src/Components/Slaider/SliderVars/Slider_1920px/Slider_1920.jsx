import React, { useEffect, useState } from "react";
import "./MySlaider.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import $ from "jquery.transit";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Slider_1920() {
    const [items, setItems] = useState('');
    useEffect(() => {
      fetch("response_1715176709774.json", {
        method: "GET",
        headers: {
          "X-API-KEY": "bfea6215-8e13-4034-aca3-8ba2c6f06f4b",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => setItems(json))
        .catch((err) => console.log(err));
    }, [null]);
    let items_all = items.items;
    let marg = 160;
    useEffect(() => {
      $(".slaider").css({ "--margin": `${marg}px` });
      if (marg == 160) $(".sideBar-arrow.right").css({ display: "none" });
    }, [null]);
  return (
      <section className="slider-1920px">
        <div className="sideBar">
          <IoIosArrowBack
            className="sideBar-arrow right"
            onClick={() => {
              marg += 640;
              $(".slaider").css({ "--margin": `${marg}px` });
              if (marg != -1760) $(".sideBar-arrow.left").css({ display: "flex" });
              marg == 160 && $(".sideBar-arrow.right").css({ display: "none" });
            }}
          />
        </div>
        <div className="slaider">
          {items_all &&
            items_all.map((el) => (
              <div className="slaider-itemElem" key={el.kinopoiskId}>
                <img src={el.posterUrl} alt="" className="slaider-itemElem-imgElem" />
                <div className="slaider-itemElem-switchElem">{el.nameRu}</div>
                <div className="slaider-itemElem-dataGenre">
                  {el.year}, {el.genres[0].genre}
                </div>
              </div>
            ))}
          <div className="moreBut">
            <FaArrowRightLong className="moreBut-moreButArrow" />
            Показать все
          </div>
        </div>
        <div className="sideBar" style={{ right: 0 }}>
          <IoIosArrowForward
            className="sideBar-arrow left"
            onClick={() => {
              marg -= 640;
              if (marg != 160) $(".sideBar-arrow.right").css({ display: "flex" });
              $(".slaider").css({ "--margin": `${marg}px` });
              marg == -1760 && $(".sideBar-arrow.left").css({ display: "none" });
            }}
          />
        </div>
      </section>
  );
}
