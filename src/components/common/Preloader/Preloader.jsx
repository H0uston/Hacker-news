import React from "react";
import preloader from "../../../assets/images/preloader.svg"
import styles from "./Preloader.module.css"

const Preloader = (props) => {
    return (
        <div className={styles.preloaderContent}>
            <img src={preloader} alt={"loading..."}/>
        </div>
    )
};

export default Preloader;