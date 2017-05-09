import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import logo from '../logo.svg';

import PostField from './PostField';
import Messege from './Messege';
import '../css/App.css';

injectTapEventPlugin();

class Board extends Component {
  
  constructor() {
    super();
    this.state = {
      data: [],
      countId: 0,
      inputUsrName: '',
      inputMsg: '',
    };
  }

  componentDidMount() {
    let count = this.state.countId;
    fetch('/api')
      .then(res => res.json())
      .then((d) => {
        count = d.length;
        d = d.map((p) => {
          const post = p;
          post.isReplying = false;
          post.reUserName = '';
          post.reContent = '';
          return post;
        });
        console.log(d[1].isReplying);
        console.log(d[0].reply[0].userName);
        console.log(count);
        return this.setState({ data: d, countId: count });
      })
      .catch(err => console.error(err));
  }

  handleAddNewPost() {
    const {inputUsrName, inputMsg, countId} = this.state;
    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        countId,
        inputUsrName,
        inputMsg,
      }),
    })
    .then(res => res.json())
    .then((d) => {
      const post = d;
      post.isReplying = false;
      post.reUserName = '';
      post.reContent = '';
      let data = this.state.data.concat(post);
      this.setState({ data });
    })
    .catch(err => console.log(err));
  }

  handleInputUsrName(input) {
    this.setState({inputUsrName: input});
  }

  handleInputMsg(input) {
    this.setState({inputMsg: input});
  }

  handleSendNewPost() {
    let inputUsrName = '';
    let inputMsg = '';
    let count = this.state.countId + 1;
    this.handleAddNewPost();
    this.setState({inputUsrName, inputMsg});
    this.setState({countId: count});
    console.log(count);
    return false;
  }

  handleToggleReply(id) {
    console.log('comment id'+id);
    let data = this.state.data;
    data[id].isReplying = !data[id].isReplying;
    this.setState({ data });
  }

  handleReplyUser(input, idx) {
    let data = this.state.data;
    data[idx].reUserName = input;
    this.setState({ data });
  }

  handleReplyMsg(input, idx) {
    let data = this.state.data;
    data[idx].reContent = input;
    this.setState({ data });
  }

  handleReplySend(idx) {
    let data = this.state.data;
    let name = data[idx].reUserName;
    let content = data[idx].reContent;
    fetch(`/api/comments/${idx}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        content,
      }),
    })
    .then(res => res.json())
    .then((p) => {
      const post = p;
      data[idx].reply = data[idx].reply.concat(post);
      data[idx].isReplying = false;
      data[idx].reUserName = '';
      data[idx].reContent = '';
      this.setState({ data });
    })
    .catch(err => console.log(err));
    console.log(data[idx].reply.length);
    return false;
  }

  displayBoard() {
    return (
      <div className="board">
        <PostField 
          usrName={this.state.inputUsrName}
          content={this.state.inputMsg}
          handleInputUsrName={input => this.handleInputUsrName(input)}
          handleInputMsg={input => this.handleInputMsg(input)}
          handleSend={() => this.handleSendNewPost()}
        />
        {this.state.data.map((d, id) =>
          <Messege
            key={id}
            msg={d}
            toggleReplying={() => this.handleToggleReply(id)}
            handleReUsrName={(input, idx) => this.handleReplyUser(input, idx)}
            handleReContent={(input, idx) => this.handleReplyMsg(input, idx)}
            handleReplySend={() => this.handleReplySend(id)}
          />
        )}
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <h1>方方ㄉ窩</h1>
        {this.displayBoard()}
      </div>
    );
  }
}

export default Board;
