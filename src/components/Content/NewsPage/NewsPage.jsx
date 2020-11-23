import React, {useEffect, useState} from "react";
import Preloader from "../../common/Preloader/Preloader";
import NewsPageInfo from "./NewsPageInfo/NewsPageInfo";
import CommentsContainer from "./Comments/CommentsContainer";
import styles from "./NewsPage.module.css";

const NewsPage = (props) => {
    let [newsId, setNewsId] = useState(undefined);
    let [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        let loadData = async () => {
            setIsFetching(true);
            let queryId = props.match.params.newsId;
            setNewsId(queryId);
            await props.getNewsInfo(queryId);
            setIsFetching(false);
        };
        loadData();
    }, []);

    return (
        <article className={styles.NewsPage}>
            {!props.newsInfo || isFetching
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