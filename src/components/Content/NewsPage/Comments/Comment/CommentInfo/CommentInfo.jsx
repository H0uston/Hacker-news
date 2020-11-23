import React from "react";
import styles from "./CommentInfo.module.css";

const CommentInfo = (props) => {
    return (
        <>
            <div className={styles.commentInfoContent}>
                <div className={styles.author}>
                    {props.author}
                </div>
                <div className={styles.date}>
                    at {new Date(props.time * 1000).toLocaleString()}
                </div>
            </div>
        </>
    );
};

export default CommentInfo;