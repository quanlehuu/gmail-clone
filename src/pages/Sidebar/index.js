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

const sidebarItems = [
  {
    path: "/",
    lable: "Inbox",
    icon: <InboxIcon className={styles.icon} />,
  },
  {
    path: "/starred",
    lable: "Starred",
    icon: <StarOutlineIcon className={styles.icon} />,
  },
  {
    path: "/snoozed",
    lable: "Snoozed",
    icon: <QueryBuilderIcon className={styles.icon} />,
  },
  {
    path: "/sent",
    lable: "Sent",
    icon: <SendOutlinedIcon className={styles.icon} />,
  },
  {
    path: "/drafts",
    lable: "Drafts",
    icon: <InsertDriveFileOutlinedIcon className={styles.icon} />,
  },
];
function Sidebar({ open }) {
  const location = useLocation();
  return (
    <ul className={open ? styles.SidebarMenu : styles.SidebarMenuZoomOut}>
      {sidebarItems.map((item) => {
        return (
          <li key={item.path}>
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
                  <span className={styles.menuItemContent}>{item.lable}</span>
                )}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Sidebar;
