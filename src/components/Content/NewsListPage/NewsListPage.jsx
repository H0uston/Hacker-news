import React, {useEffect, useState} from 'react';
import Preloader from "../../common/Preloader/Preloader";
import NewsItem from "./NewsItem/NewsItem";
import Title from "./Title/Title";

const NewsListPage =  (props) => {
    let [newsItems, setNewsItems] = useState([]);
    let [stateInterval, setStateInterval] = useState(null);
    let [isFetching, setIsFetching] = useState(false);

    let refreshLastNews = async () => {
        setIsFetching(true);
        await props.getLastNews(props.lastNewsMaxCount);
        setIsFetching(false);
    };

    let forceRefreshLastNews = async () => {
        clearInterval(stateInterval);
        await refreshLastNews();
        setStateInterval(setInterval(async () => await refreshLastNews(), props.updateNewsTime));
    };

    useEffect(() => {
        props.getLastNews(props.lastNewsMaxCount);
        setStateInterval(setInterval(async () => await refreshLastNews(), props.updateNewsTime));
        return () => {
            clearInterval(stateInterval);
        }
    }, []);

    useEffect(() => {
        if (props.newsItems !== null) {
            setNewsItems(props.newsItems.map((n, index) => <NewsItem index={index + 1} key={n.id} {...n}/>));
        }
    }, [props.newsItems]);

    return (
        <article>
            <Title isFetching={isFetching} refreshPage={forceRefreshLastNews} />
            {!props.newsItems
                ? <Preloader />
                : <>
                    {newsItems}
                  </>
            }
        </article>
    );
};

export default NewsListPage;