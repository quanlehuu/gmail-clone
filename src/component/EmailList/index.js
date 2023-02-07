import { useState } from "react";
import EmailItem from "../EmailItem";
import styles from "./EmailList.module.scss";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import clsx from "clsx";
import { useEffect } from "react";
import { API_URL } from "../../constants";

const token = localStorage.getItem("token");

function EmailList() {
  const [checkedItems, setCheckedItems] = useState([]);
  const [emailList, setEmailList] = useState([]);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetch(
      `${API_URL}/get-inbox?input=${JSON.stringify({
        page: page,
      })}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setEmailList(data.result.data.data);
        setData(data.result.data);
      });
  }, [setEmailList]);
  const handleCheckAll = () => {
    if (emailList.length === checkedItems.length) {
      setCheckedItems([]);
      return;
    }
    setCheckedItems(emailList.map((item) => item.email.id));
  };
  const handleNext = () => {
    if (emailList.length + (page - 1) * 50 < data.total) {
      setPage(page + 1);
    }
  };
  const handleBack = () => {
    setPage(page - 1);
  };
  const handleStar = async (index) => {
    const newEmail = { ...emailList[index] };
    newEmail.starred = !emailList.starred;
    const newEmailList = [...emailList];
    newEmailList[index] = newEmail;
    setEmailList(newEmailList);

    fetch(`${API_URL}/toggle-star-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: newEmail.email.id,
      }),
    })
      .then((response) => response.json())
      .then((result) => {});
  };
  return (
    <>
      <div className={styles.topbar}>
        <div>
          <input
            type="checkbox"
            checked={checkedItems.length === emailList.length}
            onChange={handleCheckAll}
          />
        </div>
        <div className={styles.dashbroadEmail}>
          <span>
            {(page - 1) * 50 + 1} - {(page - 1) * 50 + emailList.length} of{" "}
            {data.total}
          </span>
          <div className={styles.dashbroadEmailItem}>
            <button
              className={styles.icon}
              onClick={handleBack}
              disabled={page === 1}
            >
              {page > 1 ? (
                <ChevronLeftIcon
                  className={clsx(styles.iconLeft, styles.active)}
                />
              ) : (
                <ChevronLeftIcon className={styles.iconLeft} />
              )}
            </button>
            <button
              className={styles.icon}
              onClick={handleNext}
              disabled={emailList.length + (page - 1) * 50 === data.total}
            >
              {emailList.length + (page - 1) * 50 < data.total ? (
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
        {emailList.map((item, index) => {
          return (
            <EmailItem
              item={item}
              key={item.email.id}
              checked={checkedItems.includes(item.email.id)}
              onStar={() => handleStar(index)}
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

export default EmailList;
