import React from "react";
import styles from "./Header.module.css";
import headerIcon from "../../assets/images/headerIconLight.png";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={styles.headerComponent}>
            <div className={styles.leftContent}>
                <NavLink to={"/"} className={styles.logoAndTitle}>
                    <img className={styles.logo} src={headerIcon} alt={"logo"}/>
                    <div className={styles.title}>Hacker News</div>
                </NavLink>
            </div>
        </header>
    )
};

export default Header;