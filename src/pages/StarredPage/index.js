import StarredEmailList from "../../component/StarredEmailList";
import styles from "./StarredPage.module.scss";

function StarredPage() {
  return (
    <div className={styles.wrapper}>
      <StarredEmailList />
    </div>
  );
}

export default StarredPage;
