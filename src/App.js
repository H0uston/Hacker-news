import styles from "./App.module.css";
import React from "react";
import {Route, Switch} from "react-router-dom";
import NoMatch from "./components/NoMatch/NoMatch";
import NewsListPage from "./components/NewsListPage/NewsListPage";
import NewsPageContainer from "./components/NewsPage/NewsPageContainer";
import Header from "./components/Header/Header";

function App() {
    return (
        <main className={styles.appContent}>
            <Header/>
            <Switch>
                <Route path={"/"} exact render={() => <NewsListPage/>} />
                <Route path={"/news:newsId"} render={() => <NewsPageContainer />} />
                <Route render={() => <NoMatch />}/>
            </Switch>
        </main>
    );
}

export default App;
