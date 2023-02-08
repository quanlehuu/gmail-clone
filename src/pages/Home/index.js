import InboxEmailList from "../../component/InboxEmailList";
import styles from "./Home.module.scss";

function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.menuEmail}>
        <InboxEmailList />
      </div>
    </div>
  );
}

export default Home;
