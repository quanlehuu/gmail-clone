import { useRef } from "react";
import { useState } from "react";
import styles from "./Recipient.module.scss";
import { Controller, useFormContext } from "react-hook-form";

function Recipient() {
  const [focus, setFocus] = useState(false);
  const recipients = useRef();

  const { register, watch, control } = useFormContext();
  const email = watch("email");
  const handleBlur = (event) => {
    setFocus(false);
  };

  const handleFocus = () => {
    setFocus(true);
    recipients.current.focus();
  };

  return (
    <div className={styles.inputSpecial}>
      <button
        className={focus ? styles.inputBtn1 : styles.inputBtn}
        onClick={handleFocus}
        type="button"
      >
        {focus ? "Đến" : email ? email : "Người nhận"}
      </button>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => {
          return (
            <input
              className={focus ? styles.inputBtnFocus : styles.inputHide}
              type="text"
              value={value}
              onChange={onChange}
              onBlur={handleBlur}
              ref={recipients}
            />
          );
        }}
      />
    </div>
  );
}

export default Recipient;
