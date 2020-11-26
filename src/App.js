import React from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./state/store";

function App() {
    return (
        <div className={styles.wrapper}>
            <Header/>
            <Content/>
            <Footer/>
        </div>
    );
}

const HackerNewsApp = (props) => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        </React.StrictMode>
    )
};

export default HackerNewsApp;
