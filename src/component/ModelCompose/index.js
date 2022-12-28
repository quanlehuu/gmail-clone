import styles from "./ModelCompose.module.scss";
import CloseIcon from "../../assets/Icon/CloseIcon";
import MinusIcon from "../../assets/Icon/MinusIcon";
import ZoomIcon from "../../assets/Icon/ZoomIcon";
import ZoomOutIcon from "../../assets/Icon/ZoomOutIcon";
import TrashIcon from "../../assets/Icon/TrashIcon";
import { useState } from "react";
import Recipient from "../Recipients";

function ModelCompose({ setCompose }) {
  const [zoom, setZoom] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);
  const [userNameEmail, setUserNameEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleClose = () => {
    setCompose(false);
  };
  const handleZoom = () => {
    setZoom(!zoom);
    setZoomOut(false);
  };
  const handleZoomOut = () => {
    setZoomOut(!zoomOut);
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = (event) => {
    console.log(title, content, userNameEmail);
    event.preventDefault();
  };
  return (
    <div
      className={
        zoomOut ? styles.none : zoom ? styles.zoomBackground : styles.none
      }
    >
      {zoomOut ? (
        <div className={styles.zoomOut}>
          <div className={styles.zoomOutItem}>
            <button className={styles.outLineBtn} onClick={handleZoomOut}>
              <span>Thư mới</span>
            </button>
            <div className={styles.dashboardZoomOut}>
              <button className={styles.buttonIcon} onClick={handleZoomOut}>
                <MinusIcon />
              </button>
              <button className={styles.buttonIcon} onClick={handleZoom}>
                {zoom ? <ZoomOutIcon /> : <ZoomIcon />}
              </button>
              <button className={styles.buttonIcon} onClick={handleClose}>
                <CloseIcon />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={zoom ? styles.zoomMail : styles.newMail}>
          <div className={styles.newMailTitle}>
            <span>Thư mới</span>
            <div className={styles.dashboard}>
              <button className={styles.buttonIcon} onClick={handleZoomOut}>
                <MinusIcon />
              </button>
              <button className={styles.buttonIcon} onClick={handleZoom}>
                {zoom ? <ZoomOutIcon /> : <ZoomIcon />}
              </button>
              <button className={styles.buttonIcon} onClick={handleClose}>
                <CloseIcon />
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className={styles.composeForm}>
            <Recipient
              setUserNameEmail={setUserNameEmail}
              userNameEmail={userNameEmail}
            />
            <input
              className={styles.inputBtn}
              type="text"
              placeholder="Tiêu đề"
              value={title}
              onChange={handleChangeTitle}
            />
            <textarea
              className={zoom ? styles.contentZoom : styles.content}
              value={content}
              onChange={handleChangeContent}
            ></textarea>
            <div className={styles.btc}>
              <button className={styles.sendBtn} type="submit">
                Send
              </button>
              <button className={styles.trashIcon}>
                <TrashIcon />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ModelCompose;
