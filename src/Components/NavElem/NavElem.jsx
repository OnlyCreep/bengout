import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./MyNavElem.css";
import { CiUser } from "react-icons/ci";
import { Context } from "../Context";

export default function NavElem() {
  const { isAuth } = useContext(Context);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Beng Out</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/search">Поиск</Nav.Link>
            <Nav.Link href="#link">Фильмы</Nav.Link>
            <Nav.Link href="#link">Сериалы</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {isAuth ? (
              <a href="/user">
                <CiUser className="signElem-user" />
              </a>
            ) : (
              <a href="/login" className="signElem-sign">
                Войти
              </a>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
