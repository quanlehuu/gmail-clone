import styles from "./ModelCompose.module.scss";
import CloseIcon from "../../assets/Icon/CloseIcon";
import MinusIcon from "../../assets/Icon/MinusIcon";
import ZoomIcon from "../../assets/Icon/ZoomIcon";
import ZoomOutIcon from "../../assets/Icon/ZoomOutIcon";
import TrashIcon from "../../assets/Icon/TrashIcon";
function ModelCompose({
  zoom,
  zoomOut,
  focus,
  handleBlur,
  handleClose,
  handleFocus,
  handleZoom,
  handleZoomOut,
}) {
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
          <form className={styles.composeForm}>
            {focus ? (
              <div className={styles.inputSpecial}>
                <span>Đến</span>
                <input
                  className={styles.inputBtnFocus}
                  type="text"
                  onBlur={handleBlur}
                />
              </div>
            ) : (
              <input
                className={styles.inputBtn}
                onClick={handleFocus}
                type="text"
                placeholder="Người nhận"
              />
            )}
            <input
              className={styles.inputBtn}
              type="text"
              placeholder="Tiêu đề"
            />
            <textarea
              className={zoom ? styles.contentZoom : styles.content}
            ></textarea>
            <div className={styles.btc}>
              <button className={styles.sendBtn}>Send</button>
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
