import styles from "./EmailItem.module.scss";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import clsx from "clsx";

function EmailItem({ item, checked, onCheck }) {
  const [showStar, setShowStar] = useState(false);
  return (
    <div className={clsx(styles.emailItem, checked && styles.active)}>
      <div className={clsx(styles.checkbox, checked && styles.active)}>
        <input
          type="checkbox"
          onChange={() => onCheck(checked, item.id)}
          checked={checked}
        />
      </div>
      <button
        className={clsx(styles.starred, checked && styles.active)}
        onClick={() => setShowStar(!showStar)}
      >
        {showStar ? (
          <StarIcon className={styles.iconStarYellow} />
        ) : (
          <StarOutlineIcon className={styles.iconStar} />
        )}
      </button>
      <div className={styles.sender}>{item.Name}</div>
      <div className={styles.emailContent}>
        <span className={styles.contentDetails}>
          <span className={styles.contentTitle}>{item.Title} -</span>
          {item.Content}
        </span>
      </div>
      <div className={styles.emailTime}>{item.Time}</div>
      <div className={styles.emailItemDashbroad}>
        <button
          className={clsx(styles.dashbroadIcon, checked && styles.active)}
        >
          <DeleteOutlineIcon className={styles.icon} />
        </button>
        <button
          className={clsx(styles.dashbroadIcon, checked && styles.active)}
        >
          <DraftsOutlinedIcon className={styles.icon} />
        </button>
      </div>
    </div>
  );
}

export default EmailItem;
