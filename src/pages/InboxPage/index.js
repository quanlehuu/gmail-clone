import UserContext from "../../UserContext";
import styles from "./InboxPage.module.scss";
import React, { useContext } from "react";

function InboxPage() {
  const data = useContext(UserContext);
  console.log("C", data);
  return (
    <div className={styles.wrapper}>
      <div className={styles.topbar}>
        this is Inbox Page
        <div></div>
      </div>
    </div>
  );
}

export default InboxPage;
