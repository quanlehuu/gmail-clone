import { useState } from "react";
import EmailItem from "../EmailItem";
import styles from "./EmailStarred.module.scss";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import clsx from "clsx";
import { useEffect } from "react";
import { API_URL } from "../../constants";

function EmailStarred() {
  const [checkedItems, setCheckedItems] = useState([]);
  const [showEmail, setShowEmail] = useState([]);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetch(`${API_URL}/get-starred`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setShowEmail(data.result.data.data);
        setData(data.result.data);
      });
  }, [setShowEmail]);
  const handleCheckAll = () => {
    if (showEmail.length === checkedItems.length) {
      setCheckedItems([]);
      return;
    }
    setCheckedItems(showEmail.map((item) => item.email.id));
  };
  const handleNext = () => {
    if (showEmail.length + (page - 1) * 50 < data.total) {
      setPage(page + 1);
    }
  };
  const handleBack = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };
  return (
    <>
      <div className={styles.topbar}>
        <div>
          <input
            type="checkbox"
            checked={checkedItems.length === showEmail.length}
            onChange={handleCheckAll}
          />
        </div>
        <div className={styles.dashbroadEmail}>
          <span>
            1-{showEmail.length} of {data.total}
          </span>
          <div className={styles.dashbroadEmailItem}>
            <button className={styles.icon} onClick={handleBack}>
              {page > 1 ? (
                <ChevronLeftIcon
                  className={clsx(styles.iconLeft, styles.active)}
                />
              ) : (
                <ChevronLeftIcon className={styles.iconLeft} />
              )}
            </button>
            <button className={styles.icon} onClick={handleNext}>
              {showEmail.length + (page - 1) * 50 < data.total ? (
                <ChevronRightIcon
                  className={clsx(styles.iconRight, styles.active)}
                />
              ) : (
                <ChevronRightIcon className={styles.iconRight} />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.emailList}>
        {showEmail.map((item) => {
          return (
            <EmailItem
              item={item}
              key={item.email.id}
              checked={checkedItems.includes(item.email.id)}
              onCheck={() => {
                if (checkedItems.includes(item.email.id)) {
                  setCheckedItems(
                    checkedItems.filter((id) => id !== item.email.id)
                  );
                } else {
                  setCheckedItems([...checkedItems, item.email.id]);
                }
              }}
            />
          );
        })}
      </div>
    </>
  );
}

export default EmailStarred;
