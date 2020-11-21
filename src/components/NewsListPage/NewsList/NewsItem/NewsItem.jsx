import React from 'react';
import {NavLink} from "react-router-dom";
import styles from "./NewsItem.module.css";

const NewsItem = (props) => {
    return (
        <section className={styles.newsItem}>
            <NavLink to={`/news${props.id}`}>
                <div>
                    Title: {props.title}
                </div>
                <div>
                    Author: {props.by}
                </div>
                <div>
                    Score: {props.score}
                </div>
                <div>
                    Date: {props.time}
                </div>
                <div>
                    KIDS: {props.kids}
                </div>
            </NavLink>
        </section>
    )
};

export default NewsItem;