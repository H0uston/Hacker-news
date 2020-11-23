import React from "react";
import styles from "./NewsPageInfo.module.css";
import {NavLink} from "react-router-dom";

const NewsPageInfo = (props) => {
    return (
        <section className={styles.newsPageInfoContent}>
            <div className={styles.title}>
                {props.title}
            </div>
            <div className={styles.restData}>
                (<a className={styles.url} href={props.url}>{props.url}</a>)
                by {props.by} at {new Date(props.time * 1000).toLocaleString()}
            </div>
            <NavLink className={styles.backButton} to={"/"}>
                Back to news list
            </NavLink>
        </section>
    )
};

export default NewsPageInfo;