import React, {useEffect, useState} from "react";
import Comment from "./Comment/Comment";
import Preloader from "../../common/Preloader/Preloader";

function Comments(props) {
    let [rootComments, setRootComments] = useState([]);
    let [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        let loadComments = async () => {
            setIsFetching(true);
            await props.getListOfComments(props.commentIds);
            setIsFetching(false);
        };
        loadComments();

    }, []);

    /*
    let showNestedComments = async (commentId) => {
        let [commentItem] = props.comments.filter(c => c.id === commentId);
        await props.getNestedComments(commentItem.kids, commentId);
    };*/

    useEffect(() => {
        debugger;
        setRootComments(props.rootComments.map(c => <Comment  isParent={true}
                                                                        openedComments={props.openedComments}
                                                                        nestedComments={props.nestedComments}
                                                                        key={c.id}
                                                                        openComment={props.openComment}
                                                                        closeComment={props.closeComment}
                                                                        getNestedComments={props.getNestedComments}
                                                                        {...c}/>));
    }, [props.rootComments, props.openedComments, props.nestedComments]);

    return (
        <div>
            Комментарии ({props.commentIds ? props.commentIds.length : "0"})
            {isFetching ? <Preloader/> : rootComments}
        </div>
    )
}

export default Comments;