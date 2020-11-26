import React, {useEffect, useState} from "react";
import Preloader from "../../common/Preloader/Preloader";
import NewsPageInfo from "./NewsPageInfo/NewsPageInfo";
import CommentsContainer from "./Comments/CommentsContainer";
import styles from "./NewsPage.module.css";
import {Redirect} from "react-router-dom";

const NewsPage = (props) => {
    let [newsId, setNewsId] = useState(undefined);
    let [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        let _isMounted = true;
        let loadData = async () => {
            setIsFetching(true);
            let queryId = props.match.params.newsId;  //getting pageId from url
            if (isNaN(parseInt(queryId))) {
                return <Redirect to={"/pageNotFound"}/>
            }
            setNewsId(queryId);
            await props.getNewsInfo(queryId);
            if (_isMounted) {
                setIsFetching(false);
            }
        };
        loadData();

        return () => {
            _isMounted = false;
        }
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