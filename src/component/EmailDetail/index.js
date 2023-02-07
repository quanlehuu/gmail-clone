import styles from "./EmailDetail.module.scss";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ReplyIcon from "@mui/icons-material/Reply";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RedoIcon from "@mui/icons-material/Redo";

function EmailDetail({ data }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{data.email.subject}</div>
      <div className={styles.container}>
        <div className={styles.containerLeft}>
          <div className={styles.avatar}>
            <img
              src="https://lh3.googleusercontent.com/a/default-user=s40-p"
              alt="avtar"
            />
          </div>
        </div>
        <div className={styles.containerRight}>
          <div className={styles.sender}>
            <span className={styles.userName}>{data.receiverEmail}</span>
            <div className={styles.manageSubject}>
              <span className={styles.createAt}>{data.email.createdAt}</span>
              <div className={styles.dashbroadItem}>
                <button className={styles.detailIcon}>
                  <StarBorderIcon className={styles.iconItem} />
                </button>
                <button className={styles.detailIcon}>
                  <ReplyIcon className={styles.iconItem} />
                </button>
                <button className={styles.detailIcon}>
                  <MoreVertIcon className={styles.iconItem} />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <p>{data.email.content}</p>
          </div>
          <div className={styles.Mangereply}>
            <button className={styles.reply}>
              <ReplyIcon className={styles.iconItem} /> Reply
            </button>
            <button className={styles.forward}>
              <RedoIcon className={styles.iconItem} /> Forward
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailDetail;
