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

const schema = z.object({
  email: z
    .string() // invalid_type
    .trim()
    .min(1, { message: "Enter an email" }),
});
function StepOne({ onSubmit, notValue }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });
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
              helperText={errors.email && errors.email.message}
            />
            {notValue ? (
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
