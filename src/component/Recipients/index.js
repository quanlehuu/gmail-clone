import { useRef } from "react";
import { useState } from "react";
import styles from "./Recipient.module.scss";
import { Controller, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  to: z
    .string()
    .trim()
    .min(1, { message: "Please specify at least one recipient." }),
});

function Recipient() {
  const [focus, setFocus] = useState(false);
  const recipients = useRef();

  const { watch, control } = useFormContext();
  const to = watch("to");
  const handleBlur = () => {
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
        {focus ? "To" : to ? to : "Recipients"}
      </button>
      <Controller
        control={control}
        name="to"
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
