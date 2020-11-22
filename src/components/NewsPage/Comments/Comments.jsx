import React, {useEffect, useState} from "react";
import Comment from "./Comment/Comment";
import Preloader from "../../common/Preloader/Preloader";

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
        loadComments();

        setStateInterval(setInterval(() => props.updateComments(props.pageId), props.updateCommentsTime));

        return () => {
            clearInterval(stateInterval);
        }
    }, []);

    useEffect(() => {
        setRootComments(props.rootComments.map(c => <Comment  isParent={true}
                                                                        openedComments={props.openedComments}
                                                                        nestedComments={props.nestedComments}
                                                                        key={c.id}
                                                                        openComment={props.openComment}
                                                                        closeComment={props.closeComment}
                                                                        getNestedComments={props.getNestedComments}
                                                                        {...c}/>));
    }, [props.rootComments, props.openedComments, props.nestedComments]);

    let updateComments = () => {
        clearInterval(stateInterval);
        props.updateComments(props.pageId);
        setStateInterval(setInterval(() => props.updateComments(props.pageId), props.updateCommentsTime));
    };

    return (
        <div>
            Комментарии ({props.rootComments ? props.rootComments.length : "0"})
            <span>
                <button onClick={updateComments}>
                    Refresh comments
                </button>
            </span>
            {isFetching ? <Preloader/> : rootComments}
        </div>
    )
}

export default Comments;