import styles from "./EmailItem.module.scss";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function EmailItem() {
  const [showStar, setShowStar] = useState(false);
  return (
    <div className={styles.emailItem}>
      <div className={styles.checkbox}>
        <input type="checkbox" />
      </div>
      <button className={styles.starred} onClick={() => setShowStar(!showStar)}>
        {showStar ? (
          <StarIcon className={styles.iconStarYellow} />
        ) : (
          <StarOutlineIcon className={styles.iconStar} />
        )}
      </button>
      <div className={styles.sender}>Lehuuquan</div>
      <div className={styles.emailContent}>
        <span className={styles.contentDetails}>
          <span className={styles.contentTitle}>
            Bạn có hài lòng với công việc hiện tại không? -
          </span>
          Tham gia khảo sát, có ngay cơ hội nhận phần quà là tiền mặt 200K Bạn
          thân mến, JobsGO xin cảm ơn bạn đã đồng hành cùng JobsGO trong suốt
          thời gian vừa qua. Là một đơn vị uy tín trong lĩnh vực tuyển
        </span>
      </div>
      <div className={styles.emailTime}>09:27</div>
      <div className={styles.emailItemDashbroad}>
        <button className={styles.dashbroadIcon}>
          <DeleteOutlineIcon className={styles.icon} />
        </button>
        <button className={styles.dashbroadIcon}>
          <DraftsOutlinedIcon className={styles.icon} />
        </button>
      </div>
    </div>
  );
}

export default EmailItem;
