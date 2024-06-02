import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./GenresStyle.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Context } from "../../Context";

function GenresVars() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [genres, setGenres] = useState([]);
  const { genresSel } = useContext(Context);
  const { setSelect } = useContext(Context);

  useEffect(() => {
    fetch("response_1716115252073.json")
      .then((res) => res.json())
      .then((res) => setGenres(res.genres));
  }, [null]);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="categBut-genr">
        {genresSel != "" ? (
          genresSel.map((el) => (
            <span className="genres-genre-str" key={el.id}>
              {el.genre}
            </span>
          ))
        ) : (
          <span style={{ margin: "auto" }}>Не указано</span>
        )}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          style={{ border: "none", backgroundColor: "rgb(83, 83, 83)" }}
        ></Modal.Header>
        <Modal.Body
          className="genre"
          style={{
            borderBottom: "1px solid rgb(123, 123, 123)",
            backgroundColor: "rgb(83, 83, 83)",
          }}
        >
          <div className="genres">
            {genresSel.map((el) => (
              <span
                className="genres-genre-str"
                key={el.id}
                onClick={() => {
                  setGenres(
                    [...genres, el].sort((a, b) =>
                      a.genre.localeCompare(b.genre)
                    )
                  );
                  setSelect(
                    genresSel
                      .filter((ret) => ret.genre != el.genre)
                      .sort((a, b) => a.genre.localeCompare(b.genre))
                  );
                }}
              >
                {el.genre}
                <IoMdCloseCircleOutline className="genres-closeBut" />
              </span>
            ))}
          </div>
        </Modal.Body>
        <Modal.Body
          className="genre"
          style={{
            borderBottom: "1px solid rgb(123, 123, 123)",
            backgroundColor: "rgb(83, 83, 83)",
          }}
        >
          <div className="genres">
            {genres.map((el) => (
              <span
                className="genres-genre-str"
                key={el.id}
                onClick={() => {
                  setSelect(
                    [...genresSel, el].sort((a, b) =>
                      a.genre.localeCompare(b.genre)
                    )
                  );
                  setGenres(
                    genres
                      .filter((ret) => ret.genre != el.genre)
                      .sort((a, b) => a.genre.localeCompare(b.genre))
                  );
                }}
              >
                {el.genre}
              </span>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              setGenres(
                genres,
                genresSel.map((el) => genres.push(el))
              );
              setGenres(genres.sort((a, b) => a.genre.localeCompare(b.genre)));
              setSelect([]);
            }}
          >
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleClose} className="saveBut">
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GenresVars;
