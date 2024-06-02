import React, { useEffect, useRef, useState } from "react";
import "./SignStyles.css";
import { FaFacebookF, FaTwitter } from "react-icons/fa6";
import { IoLogoGoogleplus, IoLogoVk } from "react-icons/io";
import SignPanel from "./Panels/SignPanel";
import RegPanel from "./Panels/RegPanel";
import axios from "axios";

export default function SignPage() {
  const visBlock = useRef(null);
  const [isSign, setSign] = useState(false);
  const [blockPos, setPos] = useState(-100);
  const [panel, setPanel] = useState(<SignPanel />);

  useEffect(() => {
    if (document.cookie.split("=")[1]) {
      axios
        .post("http://localhost:4000/test", {
          id: document.cookie.split("=")[1],
        })
        .then(() => {
          document.location.href = "/user"
        });
    }
  }, [null]);

  document.title = "Войти | Регистрация";

  useEffect(() => {
    setTimeout(() => {
      setPanel(isSign ? <RegPanel /> : <SignPanel />);
    }, 500);
  }, [isSign]);
  return (
    <section className="signSection">
      <main
        className="signSection-sign_container"
        style={{ border: `${isSign ? "#e7e7e7" : "#E96E00"} 1px solid` }}
      >
        <div
          className={`signSection-sign_container-signElem`}
          style={{
            transform: `${isSign ? "translateX(100%)" : "translateX(0%)"}`,
            animation: `panelAnim_${isSign} 1s`,
          }}
        >
          {panel}
        </div>
        <div
          ref={visBlock}
          className="signSection-sign_container-visibleBlock"
          style={{
            "--borderLf": `${isSign ? 20 : 125}px`,
            "--borderRg": `${!isSign ? 20 : 125}px`,
          }}
        >
          <h1
            className={`signSection-sign_container-visibleBlock-title isSign-${isSign}`}
            style={{ "--textTitle": isSign ? "'Регистрация'" : "'Войти'" }}
          ></h1>
          <span
            className={`signSection-sign_container-visibleBlock-autoSign isSign-${isSign}`}
          >
            <FaFacebookF
              className={`signSection-sign_container-visibleBlock-autoSign-icon isSign-${isSign}`}
              style={{
                "--bcClrSign": `${isSign ? "#E96E00" : "#e7e7e7"}`,
                "--colorSign": `${isSign ? "#e7e7e7" : "#E96E00"}`,
              }}
            />
            <IoLogoVk
              className={`signSection-sign_container-visibleBlock-autoSign-icon isSign-${isSign}`}
              style={{
                "--bcClrSign": `${isSign ? "#E96E00" : "#e7e7e7"}`,
                "--colorSign": `${isSign ? "#e7e7e7" : "#E96E00"}`,
              }}
            />
            <IoLogoGoogleplus
              className={`signSection-sign_container-visibleBlock-autoSign-icon isSign-${isSign}`}
              style={{
                "--bcClrSign": `${isSign ? "#E96E00" : "#e7e7e7"}`,
                "--colorSign": `${isSign ? "#e7e7e7" : "#E96E00"}`,
              }}
            />
            <FaTwitter
              className={`signSection-sign_container-visibleBlock-autoSign-icon isSign-${isSign}`}
              style={{
                "--bcClrSign": `${isSign ? "#E96E00" : "#e7e7e7"}`,
                "--colorSign": `${isSign ? "#e7e7e7" : "#E96E00"}`,
              }}
            />
          </span>
          <span
            className={`signSection-sign_container-visibleBlock-question isSign-${isSign}`}
            style={{
              "--textTitle": isSign
                ? "'Уже есть аккаунт'"
                : "'Впервые на сайте'",
            }}
            onClick={() => {
              if (visBlock.current)
                visBlock.current.style.transform = `translateX(${blockPos}%)`;
              visBlock.current.style.backgroundColor = `${
                isSign ? "#E96E00" : "#e7e7e7"
              }`;
              visBlock.current.style.color = `${
                isSign ? "#e7e7e7" : "#E96E00"
              }`;

              setPos(-(blockPos + 100));
              setSign(!isSign);
            }}
          ></span>
        </div>
      </main>
    </section>
  );
}
