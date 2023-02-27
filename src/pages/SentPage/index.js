import SentEmailList from "../../component/SentEmailList";
import styles from "./SentPage.module.scss";
function SentPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topbar}>
        <SentEmailList />
        <div></div>
      </div>
    </div>
  );
}

export default SentPage;
