import styles from "./SignIn.module.scss";
import { Controller, useForm } from "react-hook-form";
import GoogleIcon from "../../assets/Icon/GoogleIcon";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
const schema = z.object({
  email: z
    .string() // invalid_type
    .trim()
    .min(1, { message: "Enter an email" }),
  password: z
    .string() // invalid_type
    .trim()
    .min(1, { message: "Enter a password" }),
});
const userNames = [
  {
    email: "truyttruyt",
    password: "1111",
  },
];
const email = userNames.map((item) => {
  return item.email;
});
function SignIn() {
  const [showSwitch, setShowSwitch] = useState(false);
  const [notValue, setNotValue] = useState(false);
  const onSubmit = (data) => {
    console.log(data);
    if (data.email === email.toString()) {
      setShowSwitch(true);
      setNotValue(false);
    } else {
      setNotValue(true);
    }
  };
  const handleBack = () => {
    setShowSwitch(false);
  };
  return (
    <div className={styles.wrapper}>
      {showSwitch ? (
        <StepTwo
          userNames={userNames}
          onSubmit={onSubmit}
          handleBack={handleBack}
        />
      ) : (
        <StepOne onSubmit={onSubmit} notValue={notValue} />
      )}
    </div>
  );
}

export default SignIn;
