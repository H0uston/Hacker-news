import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./NewsItem.module.css";

const NewsItem = ({id, index, title, by, score, time, kids}) => {
    return (
        <NavLink to={`/news${id}`} className={styles.newsItem}>
            <div className={styles.title}>
                {index + ". " + title}
            </div>
            <div className={styles.restData}>
                by {by} with {score} points at {new Date(time * 1000).toLocaleString()} (comments: {kids ? kids.length : "0"})
            </div>
        </NavLink>
    )
};

export default NewsItem;