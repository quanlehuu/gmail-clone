import { useRef } from "react";
import { useState } from "react";
import styles from "./Recipient.module.scss";

function Recipient({ setUserNameEmail, userNameEmail }) {
  const [focus, setFocus] = useState(false);
  const recipients = useRef();
  const handleFocus = () => {
    setFocus(true);
    recipients.current.focus();
  };
  const handleBlur = () => {
    setFocus(false);
  };
  const handleChangeUserNameEmail = (e) => {
    setUserNameEmail(e.target.value);
  };
  return (
    <div className={styles.inputSpecial}>
      <button
        className={focus ? styles.inputBtn1 : styles.inputBtn}
        onClick={handleFocus}
        type="button"
      >
        {focus ? "Đến" : userNameEmail ? userNameEmail : "Người nhận"}
      </button>
      <input
        className={focus ? styles.inputBtnFocus : styles.inputHide}
        ref={recipients}
        type="text"
        onBlur={handleBlur}
        value={userNameEmail}
        onChange={handleChangeUserNameEmail}
      />
    </div>
  );
}

export default Recipient;
