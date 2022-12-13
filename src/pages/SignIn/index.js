import styles from "./SignIn.module.scss";
import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

function SignIn() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);

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
