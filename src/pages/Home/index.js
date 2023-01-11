import EmailItem from "../../component/EmailItem";
import styles from "./Home.module.scss";

function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topbar}>
        <div>
          <input type="checkbox" />
        </div>
        <div>
          <span>1-50 of 155</span>
        </div>
      </div>
      <div className={styles.menuEmail}>
        <EmailItem />
      </div>
    </div>
  );
}

export default Home;
