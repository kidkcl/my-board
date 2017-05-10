import React from 'react';

import PostField from './PostField';
import Reply from './Reply';
import '../css/Messege.css'

function Messege(props) {
    return (
        <div className="postbody" key={props.msg.id}>
            <h2>{props.msg.userName}</h2>
            <p>{props.msg.content.split("\n").map((i, idx) =>
                    <span key={i + idx.toString()}>{i}<br/></span>
                )}
            </p>
            <div className="postfooter">
                <a name="reply" onClick={() => props.toggleReplying()}>
                    <span className="replylink">Reply</span>
                </a>   
                <i>發表於：{props.msg.time}</i>             
            </div>
            <div className="postinner1">
            {props.msg.reply.map(post => 
                <Reply key={post.userName + post.time} reply={post} />
            )}
            </div>
            {props.msg.isReplying &&
                <PostField
                    usrName={props.msg.reUserName}
                    content={props.msg.reContent}
                    handleInputUsrName={input => props.handleReUsrName(input, props.msg.id)}
                    handleInputMsg={input => props.handleReContent(input, props.msg.id)}
                    handleSend={() => props.handleReplySend()}
                />
            }
        </div>
    );
}

export default Messege;