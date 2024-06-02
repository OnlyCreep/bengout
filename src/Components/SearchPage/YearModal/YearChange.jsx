import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import YearVar from "./YearVar";
import "./YearStyle.css";
import { Context } from "../../Context";

function YearChange() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {realYear} = useContext(Context)
  const {setRealYear} = useContext(Context)

  function closeYear() {
    setRealYear("Не указан")
    handleClose()
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="yearBut"
      >
        {realYear}
      </Button>

      <Modal show={show} onHide={() => closeYear()} className="modal">
        <Modal.Header closeButton  style={{backgroundColor: "rgb(31, 31, 31)", borderBottom: "1px solid rgb(36, 36, 36)"}}>
          <Modal.Title style={{color: "#E96E00"}}><span className="btn-hover">Год выхода</span></Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            height: "16vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgb(26, 26, 26)"
          }}
        >
          <YearVar />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeYear()}>
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

export default YearChange;
