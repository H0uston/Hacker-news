import React from "react";
import styles from "./Title.module.css"
import Preloader from "../../../common/Preloader/Preloader";
import FunctionalButton from "../../../common/Buttons/FunctionalButton";

const Title =  ({isFetching, refreshPage}) => {

    let clickHandler = () => {
        if (!isFetching) {  // if not already is fetching
            refreshPage();
        }
    };

    return (
        <div className={styles.titleContent}>
            <FunctionalButton text={"Refresh the page"} onClick={clickHandler} />
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