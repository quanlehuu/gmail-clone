import Header from "../../component/Header";
import styles from "./Home.module.scss";
import ComposeBtn from "../../component/ComposeBtn";

function Home() {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.containerLeft}>
          <ComposeBtn />
        </div>
        <div className={styles.containerCenter}></div>
        <div className={styles.containerRight}></div>
      </div>
    </div>
  );
}

export default Home;
