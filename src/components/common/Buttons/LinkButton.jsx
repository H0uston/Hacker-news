import React from "react";
import styles from "./Buttons.module.css";
import {NavLink} from "react-router-dom";

const LinkButton = ({text, to}) => {
    return (
        <NavLink className={styles.button} to={to}>
            {text}
        </NavLink>
    )
};

export default LinkButton;