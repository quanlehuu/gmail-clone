import styles from "./ComposeModal.module.scss";
import CloseIcon from "../../assets/Icon/CloseIcon";
import MinusIcon from "../../assets/Icon/MinusIcon";
import ZoomIcon from "../../assets/Icon/ZoomIcon";
import ZoomOutIcon from "../../assets/Icon/ZoomOutIcon";
import TrashIcon from "../../assets/Icon/TrashIcon";
import { useEffect, useState } from "react";
import Recipient from "../Recipients";
import { useForm, FormProvider } from "react-hook-form";
import { API_URL } from "../../constants";
import { z } from "zod";

const schema = z.object({
  to: z
    .string()
    .trim()
    .min(1, { message: "Please specify at least one recipient." })
    .email({
      message: `The address in the field was not recognized. Please make sure that all addresses are properly formed.`,
    }),
  subject: z.string().trim().min(1, { message: "Please enter subject." }),
});

const token = localStorage.getItem("token");

function ComposeModal({ setCompose }) {
  const [zoom, setZoom] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);
  const methods = useForm({
    defaultValues: {
      to: "",
      content: "",
      subject: "",
    },
  });
  const { register, reset, watch, handleSubmit } = methods;
  const watchAllFields = watch();
  const [id, setId] = useState();
  useEffect(() => {
    let timeout;
    const subscription = watch((value) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      const save = () => {
        fetch(`${API_URL}/save-email-draft`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            to: [value.to],
            subject: value.subject,
            content: value.content,
            id: id,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
              setId(data.result.data.id);
            }
          });
      };
      timeout = setTimeout(save, 500);
    });
    return () => subscription.unsubscribe();
  }, [watch, id]);

  const onSubmit = (data) => {
    const validation = schema.safeParse(data);
    if (validation.error) {
      alert(validation.error.issues[0].message);
      return;
    }
    fetch(`${API_URL}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        to: [data.to],
        subject: `${data.subject}`,
        content: `${data.content}`,
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // setCompose(false);
        alert("Submitted successfully");
      });
    reset();
  };
  const handleClose = () => {
    setCompose(false);
  };
  const handleZoom = () => {
    setZoom(!zoom);
    setZoomOut(false);
  };
  const handleZoomOut = () => {
    setZoomOut(!zoomOut);
  };
  return (
    <div
      className={
        zoomOut ? styles.none : zoom ? styles.zoomBackground : styles.none
      }
    >
      {zoomOut ? (
        <div className={styles.zoomOut}>
          <div className={styles.zoomOutItem}>
            <button className={styles.outLineBtn} onClick={handleZoomOut}>
              <span>New Message</span>
            </button>
            <div className={styles.dashboardZoomOut}>
              <button className={styles.buttonIcon} onClick={handleZoomOut}>
                <MinusIcon />
              </button>
              <button className={styles.buttonIcon} onClick={handleZoom}>
                {zoom ? <ZoomOutIcon /> : <ZoomIcon />}
              </button>
              <button className={styles.buttonIcon} onClick={handleClose}>
                <CloseIcon />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={zoom ? styles.zoomMail : styles.newMail}>
          <div className={styles.newMailTitle}>
            <span>New Message</span>
            <div className={styles.dashboard}>
              <button className={styles.buttonIcon} onClick={handleZoomOut}>
                <MinusIcon />
              </button>
              <button className={styles.buttonIcon} onClick={handleZoom}>
                {zoom ? <ZoomOutIcon /> : <ZoomIcon />}
              </button>
              <button className={styles.buttonIcon} onClick={handleClose}>
                <CloseIcon />
              </button>
            </div>
          </div>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.composeForm}
            >
              <Recipient />
              <input
                className={styles.inputBtn}
                type="text"
                placeholder="Subject"
                {...register("subject")}
              />
              <textarea
                className={zoom ? styles.contentZoom : styles.content}
                {...register("content")}
              ></textarea>
              <div className={styles.btc}>
                <button className={styles.sendBtn} type="submit" disabled={!id}>
                  Send
                </button>
                <button className={styles.trashIcon}>
                  <TrashIcon />
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      )}
    </div>
  );
}

export default ComposeModal;
