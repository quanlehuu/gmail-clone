import styles from "./SignIn.module.scss";
import { useForm } from "react-hook-form";
import GoogleIcon from "../../assets/Icon/GoogleIcon";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";

const schema = z.object({
  username: z.string().trim().min(6).max(30),
  password: z
    .string() // invalid_type
    .trim()
    .min(1, { message: "Enter a password" }),
});
function StepTwo({ onBack, username }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: username,
      password: "",
    },
    resolver: zodResolver(schema),
  });
  const [showPassword, setShowPassWord] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleShow = () => {
    setShowPassWord(!showPassword);
  };
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setErrorMessage("");
    const res = await fetch(`${API_URL}/sign-in`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const result = await res.json();
      console.log("resdata:", result);
      const token = result.result.data.token;
      localStorage.setItem("token", token);
      navigate("/");
    }
    if (res.status === 400) {
      setErrorMessage("Username or password is wrong");
    }
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.GoogleIcon}>
        <GoogleIcon />
      </div>
      <div className={styles.titleLogin}>Welcome</div>
      <div className={styles.titleLoginItem}>
        <span onClick={onBack} className={styles.gmailUser}>
          <svg
            className={styles.iconPeople}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {username}@gmail.com
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className={styles.iconDown}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </div>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} rowSpacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              error={Boolean(errors.password)}
              label="Enter your password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            {errorMessage ? (
              <p className={styles.errol}>{errorMessage}</p>
            ) : (
              errors.password && (
                <p className={styles.errol}>{errors.password.message}</p>
              )
            )}
          </Grid>
          <Grid item xs={12}>
            <div className={styles.signinPrivate}>
              <label className={styles.manageCheckbox}>
                <input
                  className={styles.checkboxBtn}
                  type="checkbox"
                  onClick={handleShow}
                />
                Show password
              </label>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={styles.signinEnd}>
              <Link className={styles.directional} to="/signup">
                Forgot password
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

export default StepTwo;
