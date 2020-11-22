import React from "react";
import styles from "./Title.module.css"
import Preloader from "../../../common/Preloader/Preloader";

const Title =  (props) => {

    let refreshPage = () => {
        if (!props.isFetching) {
            props.refreshPage();
        }
    };

    return (
        <div className={styles.titleContent}>
            <button className={styles.refreshButton} onClick={refreshPage}>
                Refresh the page
            </button>
            <div className={styles.title}>
                Latest News
            </div>
            <div className={styles.smallPreloader}>
                {props.isFetching && <Preloader/>}
            </div>
        </div>
    );
};

export default Title;