import styles from "./SignUp.module.scss";
import Button from "@mui/material/Button";
import { OutlinedInput, TextField, InputAdornment } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";

const schema = z
  .object({
    firstName: z.string().trim().min(1, { message: "Enter first name" }),
    lastName: z.string().trim().min(1, { message: "Enter last name" }),
    username: z
      .string()
      .trim()
      .min(1, { message: "Choose a Gmail address" })
      .min(6, {
        message:
          "Sorry, your username must be between 6 and 30 characters long.",
      })
      .max(30, {
        message:
          "Sorry, your username must be between 6 and 30 characters long.",
      })
      .regex(/^[a-z0-9A-Z.]+$/gm, {
        message:
          "Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed.",
      })
      .regex(/[a-zA-Z]+/gm, {
        message:
          "Sorry, usernames of 8 or more characters must include at least one alphabetical character (a-z)",
      }),
    password: z
      .string()
      .trim()
      .min(1, { message: "Enter a password" })
      .min(8, { message: "Use 8 characters or more for your password" })
      .regex(/^[a-z0-9A-Z\\.$%@!~#^&*()_+=-{}\[\]]+$/gm, {
        message:
          "Please choose a stronger password. Try a mix of letters, numbers, and symbols.",
      })
      .regex(/[a-zA-Z]+/gm, {
        message:
          "Please choose a stronger password. Try a mix of letters, numbers, and symbols.",
      })
      .regex(/[0-9]+/gm, {
        message:
          "Please choose a stronger password. Try a mix of letters, numbers, and symbols.",
      })
      .regex(/[\\.$%@!~#^&*()_+=\-{}\[\]\/]+/gm, {
        message:
          "Please choose a stronger password. Try a mix of letters, numbers, and symbols.",
      }),
    confirm: z.string().trim().min(1, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Those passwords didn’t match. Try again.",
    path: ["confirm"],
  });

function SignUp() {
  const user = useContext(UserContext).user;
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirm: "",
    },
    resolver: zodResolver(schema),
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setUsernameError(false);
    try {
      const res = await fetch(`${API_URL}/sign-up`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const result = await res.json();
        const token = result.result.data.token;
        localStorage.setItem("token", token);
        setUser(result.result.data.user);
        navigate("/");
        return;
      }

      if (res.status === 400) {
        // bad input
        setUsernameError(true);
        return;
      }

      throw res;
    } catch (e) {
      setErrorMessage("Something went wrong! Please try later!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperContent}>
        <div>
          <div className={styles.container}>
            <div className={styles.containerItem}>
              <div className={styles.title}>
                <div className={styles.IconGoogle}>
                  <svg
                    viewBox="0 0 75 24"
                    width="75"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <g id="qaEJec">
                      <path
                        fill="#ea4335"
                        d="M67.954 16.303c-1.33 0-2.278-.608-2.886-1.804l7.967-3.3-.27-.68c-.495-1.33-2.008-3.79-5.102-3.79-3.068 0-5.622 2.41-5.622 5.96 0 3.34 2.53 5.96 5.92 5.96 2.73 0 4.31-1.67 4.97-2.64l-2.03-1.35c-.673.98-1.6 1.64-2.93 1.64zm-.203-7.27c1.04 0 1.92.52 2.21 1.264l-5.32 2.21c-.06-2.3 1.79-3.474 3.12-3.474z"
                      ></path>
                    </g>
                    <g id="YGlOvc">
                      <path
                        fill="#34a853"
                        d="M58.193.67h2.564v17.44h-2.564z"
                      ></path>
                    </g>
                    <g id="BWfIk">
                      <path
                        fill="#4285f4"
                        d="M54.152 8.066h-.088c-.588-.697-1.716-1.33-3.136-1.33-2.98 0-5.71 2.614-5.71 5.98 0 3.338 2.73 5.933 5.71 5.933 1.42 0 2.548-.64 3.136-1.36h.088v.86c0 2.28-1.217 3.5-3.183 3.5-1.61 0-2.6-1.15-3-2.12l-2.28.94c.65 1.58 2.39 3.52 5.28 3.52 3.06 0 5.66-1.807 5.66-6.206V7.21h-2.48v.858zm-3.006 8.237c-1.804 0-3.318-1.513-3.318-3.588 0-2.1 1.514-3.635 3.318-3.635 1.784 0 3.183 1.534 3.183 3.635 0 2.075-1.4 3.588-3.19 3.588z"
                      ></path>
                    </g>
                    <g id="e6m3fd">
                      <path
                        fill="#fbbc05"
                        d="M38.17 6.735c-3.28 0-5.953 2.506-5.953 5.96 0 3.432 2.673 5.96 5.954 5.96 3.29 0 5.96-2.528 5.96-5.96 0-3.46-2.67-5.96-5.95-5.96zm0 9.568c-1.798 0-3.348-1.487-3.348-3.61 0-2.14 1.55-3.608 3.35-3.608s3.348 1.467 3.348 3.61c0 2.116-1.55 3.608-3.35 3.608z"
                      ></path>
                    </g>
                    <g id="vbkDmc">
                      <path
                        fill="#ea4335"
                        d="M25.17 6.71c-3.28 0-5.954 2.505-5.954 5.958 0 3.433 2.673 5.96 5.954 5.96 3.282 0 5.955-2.527 5.955-5.96 0-3.453-2.673-5.96-5.955-5.96zm0 9.567c-1.8 0-3.35-1.487-3.35-3.61 0-2.14 1.55-3.608 3.35-3.608s3.35 1.46 3.35 3.6c0 2.12-1.55 3.61-3.35 3.61z"
                      ></path>
                    </g>
                    <g id="idEJde">
                      <path
                        fill="#4285f4"
                        d="M14.11 14.182c.722-.723 1.205-1.78 1.387-3.334H9.423V8.373h8.518c.09.452.16 1.07.16 1.664 0 1.903-.52 4.26-2.19 5.934-1.63 1.7-3.71 2.61-6.48 2.61-5.12 0-9.42-4.17-9.42-9.29C0 4.17 4.31 0 9.43 0c2.83 0 4.843 1.108 6.362 2.56L14 4.347c-1.087-1.02-2.56-1.81-4.577-1.81-3.74 0-6.662 3.01-6.662 6.75s2.93 6.75 6.67 6.75c2.43 0 3.81-.972 4.69-1.856z"
                      ></path>
                    </g>
                  </svg>
                </div>
                <p className={styles.contentTitle}>Create a Google Account</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1} rowSpacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      error={Boolean(errors.firstName)}
                      label="FirstName"
                      variant="outlined"
                      size="small"
                      {...register("firstName")}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Last Name"
                      name="lastName"
                      variant="outlined"
                      {...register("lastName")}
                      disabled={loading}
                      error={errors.lastName ? true : false}
                      size="small"
                    />
                  </Grid>
                  <div className={styles.note}>
                    {errors.firstName && errors.lastName ? (
                      <span className={styles.error}>
                        Enter first and last names
                      </span>
                    ) : errors.firstName ? (
                      <span className={styles.error}>
                        {errors.firstName.message}
                      </span>
                    ) : errors.lastName ? (
                      <span className={styles.error}>
                        {errors.lastName.message}
                      </span>
                    ) : null}
                  </div>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="UserName"
                      variant="outlined"
                      {...register("username")}
                      error={errors.username || usernameError}
                      disabled={loading}
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            @gmaill.com
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div className={styles.gmailNote}>
                      {errors.username || usernameError ? (
                        <span className={styles.error}>
                          {usernameError
                            ? "This username is existing, please try another one"
                            : errors.username.message}
                        </span>
                      ) : (
                        <span>You can use letters, numbers & periods</span>
                      )}
                    </div>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      error={errors.password}
                      {...register("password")}
                      disabled={loading}
                      label="Password"
                      variant="outlined"
                      size="small"
                      type={showPassword ? "text" : "password"}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Confirm"
                      type={showPassword ? "text" : "password"}
                      disabled={loading}
                      variant="outlined"
                      size="small"
                      error={!errors.password && errors.confirm ? true : false}
                      {...register("confirm")}
                    />
                  </Grid>
                  <div className={styles.note}>
                    {errors.password ? (
                      <span className={styles.error}>
                        {errors.password.message}
                      </span>
                    ) : errors.confirm ? (
                      <span className={styles.error}>
                        {errors.confirm.message}
                      </span>
                    ) : (
                      <span>
                        <span>
                          Use 8 or more characters with a mix of letters,
                          numbers & symbols
                        </span>
                      </span>
                    )}
                  </div>
                  <label className={styles.checkboxBtn}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      onClick={handleShowPassword}
                    />
                    Show Password
                  </label>
                  <div className={styles.note}>
                    {errorMessage && (
                      <span className={styles.error}>{errorMessage}</span>
                    )}
                  </div>
                  <div className={styles.registerEnd}>
                    <Link to="/signin" className={styles.highlight}>
                      Sign in instead
                    </Link>
                    <LoadingButton
                      loading={loading}
                      variant="contained"
                      type="submit"
                      style={{ textTransform: "none" }}
                      disabled={loading}
                    >
                      Next
                    </LoadingButton>
                  </div>
                </Grid>
              </form>
            </div>
            <div className={styles.containerItem1}>
              <img
                className={styles.imgRegister}
                src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"
                alt=""
              />
              <p>One account. All of Google working for you.</p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default SignUp;
