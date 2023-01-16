import { useState } from "react";
import Sidebar from "../../pages/Sidebar";
import ComposeBtn from "../ComposeBtn";
import Header from "../Header";
import styles from "./ContentPage.module.scss";

function ContentPage({ children }) {
  const [open, setOpen] = useState(true);
  const handleToggleSidebar = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Header onToggleSidebarClick={handleToggleSidebar} />
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <ComposeBtn />
          <Sidebar open={open} />
        </div>
        <div className={styles.container}>{children}</div>
      </div>
    </div>
  );
}

export default ContentPage;
