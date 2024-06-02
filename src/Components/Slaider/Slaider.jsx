import React, { useContext, useEffect, useRef, useState } from "react";
import "./MySlaider.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Context } from "../Context";

export default function Slaider() {
  let { items } = useContext(Context);
  const [sliderMarg, setMarg] = useState(0);
  const {setUrl} = useContext(Context)
  const left = useRef(null);
  const right = useRef(null);
  let maxMarg = 640;
  let maxSliderMarg = -1920;
  useEffect(() => {
    if (sliderMarg == 0) {
      if (!left.current) return;

      left.current.style.display = "none";
    } else {
      if (!left.current) return;

      left.current.style.display = "block";
    }
    if (sliderMarg == maxSliderMarg) {
      if (!right.current) return;

      right.current.style.display = "none";
    } else {
      if (!right.current) return;

      right.current.style.display = "block";
    }
  }, [sliderMarg]);
  return (
    <>
      {
        <section className="sliderSection">
          <div className="elems">
            <div className="slaider" style={{ "--marg": sliderMarg + "px" }}>
              {items &&
                items.map((el) => (
                  <Link
                    to={`/film:${el.kinopoiskId}`}
                    key={el.kinopoiskId}
                    onClick={() => {
                      setUrl(el.kinopoiskId)
                    }}
                  >
                    <div className="slaider-itemElem">
                      <img
                        src={el.posterUrl}
                        alt=""
                        className="slaider-itemElem-imgElem"
                      />
                      <div className="slaider-itemElem-switchElem">
                        {el.nameRu}
                      </div>
                      <div className="slaider-itemElem-dataGenre">
                        {el.year}, {el.genres[0].genre}
                      </div>
                    </div>
                  </Link>
                ))}
              <div className="moreBut">
                <FaArrowRightLong className="moreBut-moreButArrow" />
                Показать все
              </div>
            </div>
          </div>
          <div className="arrows">
            <div ref={left}>
              <IoIosArrowBack
                className="arrows-arrow right"
                style={{ left: "10px" }}
                onClick={() => setMarg(sliderMarg + maxMarg)}
              />
            </div>
            <div ref={right}>
              <IoIosArrowForward
                className="arrows-arrow left"
                style={{ right: "10px" }}
                onClick={() => setMarg(sliderMarg - maxMarg)}
              />
            </div>
          </div>
        </section>
      }
    </>
  );
}
