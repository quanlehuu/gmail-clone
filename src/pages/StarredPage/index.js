import EmailStarred from "../../component/EmailStarred";
import styles from "./StarredPage.module.scss";

function StarredPage() {
  return (
    <div className={styles.wrapper}>
      <EmailStarred />
    </div>
  );
}

export default StarredPage;
