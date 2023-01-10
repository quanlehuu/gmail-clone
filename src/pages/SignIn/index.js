import styles from "./SignIn.module.scss";
import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { useContext } from "react";
import UserContext from "../../UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const user = useContext(UserContext).user;
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className={styles.wrapper}>
      {step === 1 ? (
        <StepOne
          email={email}
          onNext={(email) => {
            setEmail(email);
            setStep(2);
          }}
        />
      ) : (
        <StepTwo
          username={email}
          onBack={() => {
            setStep(1);
          }}
        />
      )}
    </div>
  );
}

export default SignIn;
