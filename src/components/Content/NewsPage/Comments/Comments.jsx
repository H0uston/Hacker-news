import React, {useEffect, useState} from "react";
import Comment from "./Comment/Comment";
import Preloader from "../../../common/Preloader/Preloader";
import styles from "./Comments.module.css";

function Comments(props) {
    let [rootComments, setRootComments] = useState([]);
    let [isFetching, setIsFetching] = useState(false);
    let [stateInterval, setStateInterval] = useState(null);

    useEffect(() => {
        let loadComments = async () => {
            setIsFetching(true);
            await props.getListOfComments(props.commentIds);
            setIsFetching(false);
        };
        if (props.commentIds) {
            loadComments();
        }

        setStateInterval(setInterval(() => props.updateComments(props.pageId), props.updateCommentsTime));

        return () => {
            clearInterval(stateInterval);
        }
    }, []);

    useEffect(() => {
        setRootComments(props.rootComments.map(c => <Comment isParent={true}
                                                             openedComments={props.openedComments}
                                                             nestedComments={props.nestedComments}
                                                             key={c.id}
                                                             openComment={props.openComment}
                                                             closeComment={props.closeComment}
                                                             getNestedComments={props.getNestedComments}
                                                             {...c}/>));
    }, [props.rootComments, props.openedComments, props.nestedComments]);

    let forceUpdateComments = () => {
        clearInterval(stateInterval);
        props.updateComments(props.pageId);
        setStateInterval(setInterval(() => props.updateComments(props.pageId), props.updateCommentsTime));
    };

    return (
        <div>
            {isFetching ? <Preloader/> :
                <div className={styles.commentsContent}>
                    <div className={styles.miniTitle}>
                        Comments ({props.rootComments ? props.rootComments.length : "0"})
                    </div>
                    <button className={styles.refreshButton} onClick={forceUpdateComments}>
                        Refresh comments
                    </button>
                    <div className={styles.comments}>
                        {rootComments}
                    </div>
                </div>
            }
        </div>
    )
}

export default Comments;