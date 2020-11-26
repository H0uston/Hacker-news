import React from "react";
import styles from "./Footer.module.css";

const Footer = (props) => {
    return (
        <footer className={styles.footerComponent}>
            2020 <a className={styles.link} href={"github.com/H0uston"}> github.com/H0uston</a>
        </footer>
    )
};

export default Footer;