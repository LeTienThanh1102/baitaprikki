import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function CountDown({ onTimeUp }) {
  const [count, setCount] = useState(120);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  }
  useEffect(() => {
    if (count === 0) {
      onTimeUp();
      setShow(true);
      return;
    }
    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [count]);
  const toHHMMSS = (secs) => {
    const sec_num = parseInt(secs, 10);
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };
  return (
    <div>
      <div className="count-container">{toHHMMSS(count)}</div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ending Test</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn đã hết thời gian làm bài</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">
              Xem kết quả
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
}

export default CountDown;
