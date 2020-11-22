import styles from "./App.module.css";
import React from "react";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <div className={styles.wrapper}>
            <Header/>
            <Content/>
            <Footer/>
        </div>
    );
}

export default App;
