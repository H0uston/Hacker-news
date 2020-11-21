import React, {useEffect, useState} from 'react';
import styles from "./Comment.module.css";
import Preloader from "../../../common/Preloader/Preloader";

const Comment = (props) => {
    let [isFetching, setIsFetching] = useState(false);
    let haveKids = !!props.kids;

    let showOrHideNestedComments = async () => {
        if (!props.openedComments[props.id] && !props.nestedComments[props.id]) {  // if comment is hidden and nested com are not loaded
            props.openComment(props.id);
            setIsFetching(true);
            await props.getNestedComments(props.kids, props.id);
            setIsFetching(false);
        } else if (!props.openedComments[props.id]) {  // if comment is hidden and nested com are loaded
            props.openComment(props.id);
        } else if (props.openedComments[props.id]) {  // if comment is shown
            props.closeComment(props.id);
        } else {
            debugger;
        }
    };

    let nestedElements = (props.nestedComments[props.id] || []).map(c => <Comment isNested={true}
                                                                                      nestedComments={props.nestedComments}
                                                                                      openedComments={props.openedComments}
                                                                                      key={c.id}
                                                                                      openComment={props.openComment}
                                                                                      closeComment={props.closeComment}
                                                                                      getNestedComments={props.getNestedComments}
                                                                                      {...c}/>);


    return (
        <div className={styles.commentContent + " " + (props.isNested ? styles.nestedCommentContent : styles.parentCommentContent)}>
            <div onClick={() => haveKids ? showOrHideNestedComments() : ""}>
                <div className={styles.author}>
                    Комментарий от {props.by}:
                </div>
                <div className={styles.text} dangerouslySetInnerHTML={{ __html: props.text }}>
                </div>
            </div>
            <div>
                Количество вложенных: {haveKids ? props.kids.length : 0}
                {props.openedComments[props.id] && (isFetching ? <Preloader/> : nestedElements)}
            </div>
        </div>
    )
};

export default Comment;