import DraftEmailList from "../../component/DraftEmailList";
import styles from "./DraftsPage.module.scss";

function DraftsPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topbar}>
        <DraftEmailList />
      </div>
    </div>
  );
}

export default DraftsPage;
