import React, { useContext, useState } from "react";
import { BsStar } from "react-icons/bs";
import { Context } from "../Context";

export default function Rating() {
  const {rateStars} = useContext(Context)
  const {setRate} = useContext(Context)
  let rateComtHalf1 = [];
  let rateComtHalf2 = [];
  for (let i = 1; i <= 10; i++) {
    if (i % 2 != 0) {
      rateComtHalf1.push(
        <div className="rate-star-right" key={i}>
          {rateStars < i ? (
            <BsStar
              className="searchbar-sidebar-opps-stars-star-icon"
              onClick={() => setRate(i++)}
            />
          ) : (
            <BsStar
              className="searchbar-sidebar-opps-stars-star-icon"
              style={{ color: "yellow" }}
              onClick={() => setRate(i++)}
            />
          )}
        </div>
      );
    } else {
      rateComtHalf2.push(
        <div className="rate-star-left" key={i}>
          {rateStars < i ? (
            <BsStar
              className="searchbar-sidebar-opps-stars-star-icon"
              onClick={() => setRate(i++)}
            />
          ) : (
            <BsStar
              className="searchbar-sidebar-opps-stars-star-icon"
              style={{ color: "yellow" }}
              onClick={() => setRate(i++)}
            />
          )}
        </div>
      );
    }
  }
  return (
    <>
      <div className="rate-stars">{rateComtHalf1}</div>
      <div className="rate-stars">
        {rateComtHalf2}{" "}
        <div
          style={{
            transform: "translateY(-40px)",
            width: "60px",
            marginLeft: "10px",
          }}
        >
          {">" + " "}
          {rateStars}
        </div>
      </div>
    </>
  );
}
