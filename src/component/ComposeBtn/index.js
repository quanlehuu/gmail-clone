import { useState } from "react";
import PencilIcon from "../../assets/Icon/PencilIcon";
import ModelCompose from "../ModelCompose";
import styles from "./ComposeBtn.module.scss";

function ComposeBtn() {
  const [compose, setCompose] = useState(false);
  const handleOpen = () => {
    setCompose(true);
  };
  return (
    <div>
      <button className={styles.composeBtn} onClick={handleOpen}>
        <PencilIcon />
        Compose
      </button>
      {compose && <ModelCompose setCompose={setCompose} />}
    </div>
  );
}

export default ComposeBtn;
