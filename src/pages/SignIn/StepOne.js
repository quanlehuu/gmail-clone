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
import { API_URL } from "../../constants";

const schema = z.object({
  email: z.string().trim().min(1, { message: "Enter an email" }),
});
function StepOne({ onNext, email }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email,
    },
    resolver: zodResolver(schema),
  });
  const [useNameError, setUseNameError] = useState(false);
  const onSubmit = (data) => {
    let username = data.email;
    if (data.email.indexOf("@gmail.com") >= 0) {
      username = data.email.split("@gmail.com")[0];
    }
    fetch(
      `${API_URL}/check-username?input=${JSON.stringify({
        username: username,
      })}`
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.result.data) {
          setUseNameError(false);
          onNext(username);
        } else {
          setUseNameError(true);
        }
      });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.GoogleIcon}>
        <GoogleIcon />
      </div>
      <div className={styles.titleLogin}>Sign in</div>
      <p className={styles.titleLoginItem}>Use your Google Account</p>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} rowSpacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              error={Boolean(errors.email)}
              label="Email"
              variant="outlined"
              {...register("email")}
            />
            {useNameError ? (
              <p className={styles.errol}>Couldn’t find your Google Account</p>
            ) : (
              errors.email && (
                <p className={styles.errol}>{errors.email.message}</p>
              )
            )}
          </Grid>
          <Grid item xs={12}>
            <p className={styles.signinPrivate}>
              Not your computer? Use Guest mode to sign in privately.{" "}
              <span className={styles.highlight}>Learn more</span>
            </p>
          </Grid>
          <Grid item xs={12}>
            <div className={styles.signinEnd}>
              <Link className={styles.directional} to="/signup">
                Create account
              </Link>
              <Button
                variant="contained"
                type="submit"
                style={{ textTransform: "none" }}
              >
                Next
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default StepOne;
