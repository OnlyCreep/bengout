import React, { useState } from "react";
import "./SettStyles.css";
import Avatar from "./SettPanels/Avatar";
import LoginEmail from "./SettPanels/LoginEmail";
import Password from "./SettPanels/Password";

export default function Settings() {
  const [panel, setPanel] = useState(<Avatar />);
  const [oppHeight, setHeight] = useState(0);
  return (
    <section className="settingsPanels">
      <aside className="settingsPanels-li">
        <ul className="settingsPanels-li-panels">
          <h5 style={{ color: "#999" }}>Настройки профиля</h5>
          <div className="settingsPanels-li-panels-opps">
            <li
              onClick={() => {
                setHeight(0);
                setPanel(<Avatar />);
              }}
            >
              Аватар{" "}
              <div
                style={{ "--oppheight": `${oppHeight}px` }}
                className="settingsPanels-li-line"
              ></div>
            </li>
            <li
              onClick={() => {
                setHeight(40);
                setPanel(<LoginEmail />);
              }}
            >
              Логин и email
            </li>
            <li
              onClick={() => {
                setHeight(80);
                setPanel(<Password />);
              }}
            >
              Пароль
            </li>
          </div>
          <a className="backButt" href="/user">Назад</a>
        </ul>
      </aside>
      {panel}
    </section>
  );
}
