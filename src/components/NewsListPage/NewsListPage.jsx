import React from "react";
import Title from "./Title/Title";
import NewsListContainer from "./NewsList/NewsListContainer";

const NewsListPage = (props) => {
    return (
        <div>
            <Title/>
            <NewsListContainer/>
        </div>
    )
};

export default NewsListPage;