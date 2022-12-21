import styles from "./Header.module.scss";
function Header() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.manageLogo}>
        <span className={styles.menuGmail}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </span>
        <img
          src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"
          alt="Gmail"
        />
      </div>
      <div className={styles.manageSearch}></div>
      <div className={styles.manageUser}></div>
    </div>
  );
}

export default Header;
