import styles from "./DefaultPage.module.scss"
import Header from "../Header";
function DefaultPage({children}) {
    return ( 
        <div>
            <Header/>
            <div className={styles.wrapper}>
                {children}
            </div>
        </div>
     );
}

export default DefaultPage;