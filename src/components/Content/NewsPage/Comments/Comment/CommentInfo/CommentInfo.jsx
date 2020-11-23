import React from "react";
import styles from "./CommentInfo.module.css";

const CommentInfo = ({author, time}) => {
    return (
        <div className={styles.commentInfoContent}>
            <div className={styles.author}>
                {author}
            </div>
            <div className={styles.date}>
                at {new Date(time * 1000).toLocaleString()}
            </div>
        </div>
    );
};

export default CommentInfo;