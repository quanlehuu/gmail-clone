import { useState } from "react";
import PencilIcon from "../../assets/Icon/PencilIcon";
import ModelCompose from "../ModelCompose";
import styles from "./ComposeBtn.module.scss";

function ComposeBtn() {
  const [compose, setCompose] = useState(false);
  const [focus, setFocus] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);
  const handleOpen = () => {
    setCompose(true);
  };
  const handleClose = () => {
    setCompose(false);
  };
  const handleFocus = () => {
    setFocus(true);
  };
  const handleBlur = () => {
    setFocus(false);
  };
  const handleZoom = () => {
    setZoom(!zoom);
    setZoomOut(false);
  };
  const handleZoomOut = () => {
    setZoomOut(!zoomOut);
  };
  return (
    <div>
      <button className={styles.composeBtn} onClick={handleOpen}>
        <PencilIcon />
        Compose
      </button>
      {compose && (
        <ModelCompose
          zoom={zoom}
          zoomOut={zoomOut}
          focus={focus}
          handleClose={handleClose}
          handleBlur={handleBlur}
          handleFocus={handleFocus}
          handleZoom={handleZoom}
          handleZoomOut={handleZoomOut}
        />
      )}
    </div>
  );
}

export default ComposeBtn;
