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
                date={props.date}
            </div>
            <div>
                author={props.author}
            </div>
        </div>
    )
};

export default NewsPageInfo;