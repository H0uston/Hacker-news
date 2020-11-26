import React from "react";
import styles from "./Buttons.module.css";

const FunctionalButton = ({text, onClick}) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {text}
        </button>
    )
};

export default FunctionalButton;