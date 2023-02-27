import { useState } from "react";
import { useEffect } from "react";
import { API_URL } from "../../constants";
import styles from "./DraftEmailList.module.scss";
import EmailDetail from "../EmailDetail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import clsx from "clsx";
import SentEmailItem from "../SentEmailItem";
import EmailDetailSpecial from "../EmailDetailSpecial";

const token = localStorage.getItem("token");

function DraftEmailList() {
  const [checkedItems, setCheckedItems] = useState([]);
  const [emailList, setEmailList] = useState([]);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [showEmailDetail, setShowEmailDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [indexDetail, setIndexDetail] = useState();
  useEffect(() => {
    fetch(`${API_URL}/get-drafts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
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
    if (page !== 1) {
      setPage(page - 1);
    }
  };
  const handleShowDetail = (item, index) => {
    setShowEmailDetail(true);
    setDataDetail(item);
    setIndexDetail(index);
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
      {showEmailDetail ? (
        <div className={styles.topbar}>
          <div className={styles.dashbroadIcon}>
            <button
              onClick={() => setShowEmailDetail(false)}
              className={styles.detailIcon}
            >
              <ArrowBackIcon className={styles.iconItem} />
            </button>
            <button className={styles.detailIcon}>
              <DeleteIcon className={styles.iconItem} />
            </button>
            <button className={styles.detailIcon}>
              <EmailIcon className={styles.iconItem} />
            </button>
            <button className={styles.detailIcon}>
              <MoreVertIcon className={styles.iconItem} />
            </button>
          </div>
        </div>
      ) : (
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
                <ChevronLeftIcon className={clsx(styles.iconLeft)} />
              </button>
              <button
                className={styles.icon}
                onClick={handleNext}
                disabled={emailList.length + (page - 1) * 50 === data.total}
              >
                <ChevronRightIcon className={clsx(styles.iconRight)} />
              </button>
            </div>
          </div>
        </div>
      )}
      {showEmailDetail ? (
        <EmailDetailSpecial data={dataDetail} />
      ) : (
        <div className={styles.emailList}>
          {emailList.map((item, index) => {
            return (
              <SentEmailItem
                item={item}
                key={item.id}
                checked={checkedItems.includes(item.id)}
                onStar={() => handleStar(index)}
                onCheck={() => {
                  if (checkedItems.includes(item.id)) {
                    setShowEmailDetail(false);
                    setCheckedItems(
                      checkedItems.filter((id) => id !== item.id)
                    );
                  } else {
                    setCheckedItems([...checkedItems, item.id]);
                    setShowEmailDetail(false);
                  }
                }}
                onShowDetail={() => handleShowDetail(item, index)}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default DraftEmailList;