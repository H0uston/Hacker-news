import React from "react";
import styles from "./NewsPageInfo.module.css";
import LinkButton from "../../../common/Buttons/LinkButton";

const NewsPageInfo = ({title, by, url, time, text}) => {
    return (
        <section className={styles.newsPageInfoContent}>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.info}>
                { url
                    ? <>(<a className={styles.url} href={url}>{url}</a>)</>
                    :
                    <div dangerouslySetInnerHTML={{__html: text}}></div>
                }
                <div className={styles.restInfo}>
                    Post by <span className={styles.author}>{by}</span> at {new Date(time * 1000).toLocaleString()}
                </div>
            </div>
            <div className={styles.backButton}>
                <LinkButton text={"Back to news list"} to={"/"} />
            </div>
        </section>
    )
};

export default NewsPageInfo;