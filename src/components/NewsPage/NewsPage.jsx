import React, {useEffect, useState} from 'react';
import Preloader from "../common/Preloader/Preloader";
import NewsPageInfo from "./NewsPageInfo/NewsPageInfo";
import CommentsContainer from "./Comments/CommentsContainer";

const NewsPage = (props) => {

    let [newsId, setNewsId] = useState(undefined);
    useEffect(() => {
        let queryId = props.match.params.newsId;
        queryId = 25149177; // TODO
        setNewsId(queryId);
        props.getNewsInfo(queryId);
    }, []);

    return (
        <article>
            {!props.newsInfo
                ?   <Preloader/>
                :   <>
                        <NewsPageInfo {...props.newsInfo}/>
                        <CommentsContainer  commentIds={props.newsInfo.kids}
                                            pageId={newsId}/>
                    </>
            }
        </article>
    )
};

export default NewsPage;