import EmailItem from "../../component/EmailItem";
import EmailList from "../../component/EmailList";
import styles from "./Home.module.scss";

function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.menuEmail}>
        <EmailList />
      </div>
    </div>
  );
}

export default Home;
