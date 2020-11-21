import React, {useEffect, useState} from 'react';
import Preloader from "../../common/Preloader/Preloader";
import NewsItem from "./NewsItem/NewsItem";

const NewsList =  (props) => {

    let [newsItems, setNewsItems] = useState([]);

    useEffect(() => {
        props.getLastNews(props.lastNewsMaxCount);
        let interval = setInterval(() => props.getLastNews(props.lastNewsMaxCount), props.updateNewsTime);
        return () => {
            clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        if (props.newsItems !== null) {
            setNewsItems(props.newsItems.map(n => <NewsItem key={n.id} {...n}/>));
        }
    }, [props.newsItems]);

    return (
        <article>
            {!props.newsItems
                ? <Preloader />
                : <>
                    {newsItems}
                  </>
            }
        </article>
    );
};

export default NewsList;