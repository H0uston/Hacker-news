import React from 'react';
import {NavLink} from "react-router-dom";
import styles from "./NewsItem.module.css";

const NewsItem = (props) => {
    return (
        <NavLink to={`/news${props.id}`} className={styles.newsItem}>
            <div className={styles.title}>
                {props.index + ". " + props.title}
            </div>
            <div className={styles.commentData}>
                by {props.by} with {props.score} points at {new Date(props.time * 1000).toLocaleString()} (comments: {props.kids ? props.kids.length : "0"})
            </div>
        </NavLink>
    )
};

export default NewsItem;