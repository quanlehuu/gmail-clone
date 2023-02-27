import styles from "./EmailDetailSpecial.module.scss";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ReplyIcon from "@mui/icons-material/Reply";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RedoIcon from "@mui/icons-material/Redo";

function EmailDetailSpecial({ data }) {
  console.log(data);
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{data.subject}</div>
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
              <span className={styles.createAt}>{data.createdAt}</span>
              <div className={styles.dashbroadItem}>
                <button className={styles.detailIcon}>
                  <StarOutlineIcon className={styles.iconItem} />
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
            <p>{data.content}</p>
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

export default EmailDetailSpecial;
