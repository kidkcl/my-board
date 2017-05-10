import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
  color: 'white',
};

function PostField(props) {
    return (
        <div>
            <TextField className="inputUsr" hintText="Name" onChange={e => props.handleInputUsrName(e.target.value)} value={props.usrName} /><br />
            <TextField className="inputMsg" hintText="Say somthing..." onChange={e => props.handleInputMsg(e.target.value)} value={props.content} /><br />
            <RaisedButton label="Send" style={style} backgroundColor="#E91E63"
                          className="sendbtn" onTouchTap={() => props.handleSend()} />
            
        </div>
    );
}

export default PostField;