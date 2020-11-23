import React from "react";
import styles from "./Title.module.css"
import Preloader from "../../../common/Preloader/Preloader";

const Title =  ({isFetching, refreshPage}) => {

    let clickHandler = () => {
        if (!isFetching) {
            refreshPage();
        }
    };

    return (
        <div className={styles.titleContent}>
            <button className={styles.refreshButton} onClick={clickHandler}>
                Refresh the page
            </button>
            <div className={styles.title}>
                Latest News
            </div>
            <div className={styles.smallPreloader}>
                {isFetching && <Preloader/>}
            </div>
        </div>
    );
};

export default Title;