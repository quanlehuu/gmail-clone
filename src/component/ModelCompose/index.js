import styles from "./ModelCompose.module.scss";
import CloseIcon from "../../assets/Icon/CloseIcon";
import MinusIcon from "../../assets/Icon/MinusIcon";
import ZoomIcon from "../../assets/Icon/ZoomIcon";
import ZoomOutIcon from "../../assets/Icon/ZoomOutIcon";
import TrashIcon from "../../assets/Icon/TrashIcon";
import { useState } from "react";
import Recipient from "../Recipients";
import { useForm, FormProvider } from "react-hook-form";

function ModelCompose({ setCompose }) {
  const [zoom, setZoom] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);
  const methods = useForm();
  const { register, handleSubmit } = methods;
  const onSubmit = (data) => console.log(data);
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
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.composeForm}
            >
              <Recipient />
              <input
                className={styles.inputBtn}
                type="text"
                placeholder="Tiêu đề"
                {...register("title")}
              />
              <textarea
                className={zoom ? styles.contentZoom : styles.content}
                {...register("content")}
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
          </FormProvider>
        </div>
      )}
    </div>
  );
}

export default ModelCompose;
