import React, {useState} from 'react';
import styles from "./Comment.module.css";
import Preloader from "../../../../common/Preloader/Preloader";
import CommentInfo from "./CommentInfo/CommentInfo";

const Comment = (props) => {
    let [isFetching, setIsFetching] = useState(false);
    let haveKids = !!props.kids;

    let showOrHideNestedComments = async () => {
        if (!props.openedComments[props.id] && !props.nestedComments[props.id]) {  // if comment is hidden and nested com are not loaded
            props.openComment(props.id);
            setIsFetching(true);
            await props.getNestedComments(props.id);
            setIsFetching(false);
        } else if (!props.openedComments[props.id]) {  // if comment is hidden and nested com are loaded
            props.openComment(props.id);
        } else if (props.openedComments[props.id]) {  // if comment is shown
            props.closeComment(props.id);
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
        <div className={styles.commentContainer}>
            {props.deleted
                ?
                <div className={styles.deletedComment}>
                    Comment has been deleted
                </div>
                :
                <>
                    <div onClick={() => haveKids ? showOrHideNestedComments() : ""}>
                        <CommentInfo author={props.by} time={props.time}/>
                        <div className={styles.text} dangerouslySetInnerHTML={{__html: props.text}}>

                        </div>
                    </div>
                    <div>
                        <div className={styles.countOfReply}>
                            (Count of replies: {haveKids ? props.kids.length : 0})
                        </div>
                        <div className={styles.nestedComments}>
                            {props.openedComments[props.id] && (isFetching ? <Preloader/> : nestedElements)}
                        </div>
                    </div>
                </>
            }
        </div>
    )
};

export default Comment;