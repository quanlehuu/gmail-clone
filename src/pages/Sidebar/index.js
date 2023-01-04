import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InboxIcon from "@mui/icons-material/Inbox";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import clsx from "clsx";
import { useState } from "react";

const array = [
  {
    path: "/",
    lable: "Hộp thư đến",
    icon: <InboxIcon className={styles.icon} />,
  },
  {
    path: "/starred",
    lable: "Có gắn dấu sao",
    icon: <StarOutlineIcon className={styles.icon} />,
  },
  {
    path: "/snoozed",
    lable: "Đã tạm ẩn",
    icon: <QueryBuilderIcon className={styles.icon} />,
  },
  {
    path: "/sent",
    lable: "Đã Gửi",
    icon: <SendOutlinedIcon className={styles.icon} />,
  },
  {
    path: "/drafts",
    lable: "Thư nháp",
    icon: <InsertDriveFileOutlinedIcon className={styles.icon} />,
  },
];
function Sidebar({ open }) {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <ul className={open ? styles.SidebarMenu : styles.SidebarMenuZoomOut}>
      {array.map((item) => {
        const path = item.path;
        return (
          <li>
            <Link
              className={clsx(
                item.path === location.pathname ? styles.active : "",
                {
                  [styles.menuItem]: open,
                  [styles.menuItemZoomOut]: !open,
                }
              )}
              to={item.path}
            >
              <div className={styles.menuItemWrapper}>
                <span className={styles.menuItemIcon}>{item.icon}</span>
                {open && (
                  <a href="#" className={styles.menuItemContent}>
                    {item.lable}
                  </a>
                )}
              </div>
            </Link>
          </li>
        );
      })}
      <li>
        <Link
          className={clsx("", {
            [styles.menuItem]: open,
            [styles.menuItemZoomOut]: !open,
          })}
        >
          <div className={styles.menuItemWrapper}>
            <span className={styles.menuItemIcon}>
              <ArrowDropDownIcon className={styles.icon} />
            </span>
            {open && (
              <a href="#" className={styles.menuItemContent}>
                Danh sách mở rộng
              </a>
            )}
          </div>
        </Link>
      </li>
    </ul>
  );
}

export default Sidebar;
