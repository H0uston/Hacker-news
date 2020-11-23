import React from "react";
import NewsPageContainer from "./NewsPage/NewsPageContainer";
import NoMatch from "./NoMatch/NoMatch";
import {Route, Switch} from "react-router-dom";
import styles from "./Content.module.css";
import NewsListPageContainer from "./NewsListPage/NewsListPageContainer";

const Content = (props) => {
    return (
        <main className={styles.mainContent}>
            <Switch>
                <Route path={"/"} exact render={() => <NewsListPageContainer/>} />
                <Route path={"/:newsId"} render={() => <NewsPageContainer />} />
                <Route render={() => <NoMatch />}/>
            </Switch>
        </main>
    )
};

export default Content;