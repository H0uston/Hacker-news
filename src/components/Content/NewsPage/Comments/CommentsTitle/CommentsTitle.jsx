import React from "react";
import styles from "./CommentsTitle.module.css";
import FunctionalButton from "../../../../common/Buttons/FunctionalButton";
import Preloader from "../../../../common/Preloader/Preloader";

const CommentsTitle = ({commentsCount, forceUpdateComments, isUpdating}) => {
    return (
        <div className={styles.title}>
            <div className={styles.miniTitle}>
                Comments ({commentsCount})
            </div>
            <FunctionalButton text={"Refresh comments"} onClick={forceUpdateComments} />
            {isUpdating && <div className={styles.smallPreloader}><Preloader/></div>}
        </div>
    )
};

export default CommentsTitle;