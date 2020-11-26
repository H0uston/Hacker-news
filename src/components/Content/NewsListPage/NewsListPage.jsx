import React, {useEffect, useState} from 'react';
import Preloader from "../../common/Preloader/Preloader";
import NewsItem from "./NewsItem/NewsItem";
import Title from "./Title/Title";

const NewsListPage =  ({getLastNews, lastNewsMaxCount, updateNewsTime, newsItems}) => {
    let [stateNewsItems, setStateNewsItems] = useState([]);
    let [isFetching, setIsFetching] = useState(false);

    let refreshLastNews = async () => {
        setIsFetching(true);
        await getLastNews(lastNewsMaxCount);
        setIsFetching(false);
    };

    let forceRefreshLastNews = async () => {
        await refreshLastNews();
    };

    useEffect(() => {
        getLastNews(lastNewsMaxCount);
        let interval = setInterval(async () => await refreshLastNews(), updateNewsTime);
        return () => {
            clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        if (newsItems !== null) {
            setStateNewsItems(newsItems.map((n, index) => <NewsItem index={index + 1} key={n.id} {...n}/>));
        }
    }, [newsItems]);

    return (
        <article>
            <Title isFetching={isFetching} refreshPage={forceRefreshLastNews} />
            {!newsItems
                ? <Preloader />
                : <>
                    {stateNewsItems}
                  </>
            }
        </article>
    );
};

export default NewsListPage;