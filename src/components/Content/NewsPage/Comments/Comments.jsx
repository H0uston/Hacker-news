import React, {useEffect, useState} from "react";
import Comment from "./Comment/Comment";
import Preloader from "../../../common/Preloader/Preloader";
import styles from "./Comments.module.css";
import CommentsTitle from "./CommentsTitle/CommentsTitle";

function Comments(props) {
    let [stateRootCommentElements, setStateRootCommentElements] = useState([]);
    let [isFetching, setIsFetching] = useState(false);
    let [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        let _isMounted = true;
        let loadComments = async () => {
            setIsFetching(true);
            await props.getListOfComments(props.match.params.newsId);
            if (_isMounted) {  // to avoid memory leak
                setIsFetching(false);
            }
        };

        if (props.commentIds) {  // Have page comments?
            loadComments();
        }

        let interval = setInterval(async () => {
            setIsUpdating(true);
            await props.updateComments(props.pageId);
            setIsUpdating(false);
        }, props.updateCommentsTime);

        return () => {
            _isMounted = false;
            clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        setStateRootCommentElements(props.rootComments.map(c => <Comment isParent={true}
                                                             openedComments={props.openedComments}
                                                             nestedComments={props.nestedComments}
                                                             key={c.id}
                                                             openComment={props.openComment}
                                                             closeComment={props.closeComment}
                                                             getNestedComments={props.getNestedComments}
                                                             {...c}/>));
    }, [props.rootComments, props.openedComments, props.nestedComments]);

    let forceUpdateComments = async () => {
        setIsUpdating(true);
        await props.updateComments(props.pageId);
        setIsUpdating(false);
    };

    return (
        <section>
            {isFetching ? <Preloader/> :
                <div className={styles.commentsContent}>
                    <CommentsTitle commentsCount={props.rootComments ? props.rootComments.length : "0"}
                                   forceUpdateComments={forceUpdateComments}
                                   isUpdating={isUpdating} />
                    <div className={styles.comments}>
                        {stateRootCommentElements}
                    </div>
                </div>
            }
        </section>
    )
}

export default Comments;