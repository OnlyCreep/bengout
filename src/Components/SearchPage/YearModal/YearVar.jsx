import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Context } from "../../Context";

export default function YearVar() {
  let years = [];
  for (let i = 1960; i <= 2024; i++) years.push(i);
  const [year, setYear] = useState(32);
  const { realYear } = useContext(Context);
  const { setRealYear } = useContext(Context);
  useEffect(() => {
    if (year > 32) {
      setYear(32);
      setRealYear(2024);
    }
    if (year < -32) {
      setYear(-32);
      setRealYear(1960);
    }
  }, [year]);
  useEffect(() => setRealYear(2024), [null]);
  return (
    <div className="yearChanger">
      <div className="yearChanger-arrows">
        <IoIosArrowUp
          onClick={() => {
            setYear(year - 1);
            setRealYear(realYear - 1);
          }}
          className="yearChanger-arrows-arrow"
        />
        <IoIosArrowDown
          onClick={() => {
            setYear(year + 1);
            setRealYear(realYear + 1);
          }}
          className="yearChanger-arrows-arrow"
        />
      </div>
      <span className="splashLine">-</span>
      <div
        className="yearChanger-years"
        style={{ transform: `translateY(${year * -24}px)` }}
      >
        {years.map((year) => (
          <span key={year} className="yearChanger-years-year">{year}</span>
        ))}
      </div>
      <span className="splashLine">-</span>
    </div>
  );
}
