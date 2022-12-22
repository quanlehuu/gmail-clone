import styles from "./DefaultPage.module.scss"
function DefaultPage({children}) {
    return ( 
        <div>
            <div className={styles.wrapper}>
                {children}
            </div>
        </div>
     );
}

export default DefaultPage;