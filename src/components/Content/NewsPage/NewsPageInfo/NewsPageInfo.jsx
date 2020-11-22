import React from 'react';

const NewsPageInfo = (props) => {
    return (
        <div>
            <div>
                title={props.title}
            </div>
            <div>
                text={props.text}
            </div>
            <div>
                date={new Date(props.time * 1000).toLocaleDateString("en-US")}
            </div>
            <div>
                author={props.by}
            </div>
        </div>
    )
};

export default NewsPageInfo;