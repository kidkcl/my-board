import React from 'react';

function Reply(props) {
    return (
        <div key={props.reply.userName + props.reply.time}>
            <p>{props.reply.userName}</p>
            <p>發表於：{props.reply.time}</p>
            <div key={props.reply.content}>{props.reply.content.split("\n").map((i, idx) =>
                    <div key={i + idx.toString()}>{i}<br/></div>
                )}
            </div>
        </div>
    );
}

export default Reply;