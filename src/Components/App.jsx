import React, { StrictMode, useEffect, useState } from "react";
import NavElem from "./NavElem/NavElem";
import Slaider from "./Slaider/Slaider";
import { Context } from "./Context";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Search from "./SearchPage/Search";
import FilmPage from "./FilmPage/FilmPage";
import Poster from "./Poster/Poster";
import SignPage from "./SignPage/SignPage";
import UserPage from "./UserPage/UserPage";
import axios from "axios";
import Settings from "./UserPage/Settings/Settings";

export default function App() {
  const [items, setItems] = useState([]);
  const [urlFilm, setUrl] = useState("");
  const [isAuth, setAuth] = useState(false);
  const [isLoaded, setDone] = useState(false);

  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

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

  useEffect(() => {
    if (document.cookie.split("=")[1]) {
      axios
        .post("http://localhost:4000/test", {
          id: document.cookie.split("=")[1],
        })
        .then((res) => {
          if (res.data == "Success") setAuth(true);
          else setAuth(false);
        })
        .then(() => setDone(true));
    } else {
      setAuth(false);
      setDone(true);
    }
  }, [null]);
  return (
    <>
      {isLoaded && (
        <BrowserRouter>
          <Context.Provider
            value={{
              items,
              setUrl,
              isAuth,
              login,
              pass,
              email,
              avatar,
              setLogin,
              setPass,
              setEmail,
              setAvatar,
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <NavElem />
                    <h1 className="film-title">Фильмы и сериалы</h1>
                    <Slaider />
                    <h1 className="film-title">Награды и премии фильмов</h1>
                    <Poster />
                  </>
                }
              />
              <Route
                path="/search"
                element={
                  <>
                    <NavElem />
                    <Search />
                  </>
                }
              />
              <Route
                path={`/film:${
                  urlFilm ? urlFilm : document.location.pathname.split(":")[1]
                }`}
                element={
                  <>
                    <NavElem />
                    <FilmPage />
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    <NavElem />
                    <SignPage />
                  </>
                }
              />
              <Route
                path="/user"
                element={
                  <>
                    <NavElem />
                    <UserPage />
                  </>
                }
              />
              <Route
                path="/user/settings"
                element={
                  <>
                    <NavElem />
                    <Settings />
                  </>
                }
              />
            </Routes>
          </Context.Provider>
        </BrowserRouter>
      )}
    </>
  );
}
